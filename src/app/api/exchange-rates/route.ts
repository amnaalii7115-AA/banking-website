import { NextResponse } from "next/server";

type CoinbaseResponse = {
  data?: {
    currency?: string;
    rates?: Record<string, string>;
  };
};

export async function GET() {
  try {
    const response = await fetch(
      "https://api.coinbase.com/v2/exchange-rates?currency=INR",
      {
        next: {
          revalidate: 60,
        },
      },
    );

    if (!response.ok) {
      throw new Error("Unable to fetch exchange rates.");
    }

    const result =
      (await response.json()) as CoinbaseResponse;

    const receivedRates = result.data?.rates;

    if (!receivedRates) {
      throw new Error(
        "Exchange-rate data is unavailable.",
      );
    }

    const rates: Record<string, number> = {
      INR: 1,
    };

    Object.entries(receivedRates).forEach(
      ([currencyCode, rateValue]) => {
        const numericRate = Number(rateValue);

        if (
          Number.isFinite(numericRate) &&
          numericRate > 0
        ) {
          rates[currencyCode.toUpperCase()] =
            numericRate;
        }
      },
    );

    return NextResponse.json({
      base: "INR",
      rates,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Exchange-rate API error:", error);

    return NextResponse.json(
      {
        message:
          "Live exchange rates are temporarily unavailable.",
      },
      {
        status: 500,
      },
    );
  }
}