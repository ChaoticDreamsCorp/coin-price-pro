import { Paper, TextField } from "@mui/material";
import { GetFiatAmount, StringToNumber } from "./PriceCalculator";
import { useState } from "react";
import { CurrencyExchange } from "./PriceInterface";
import { formatCurrency } from "../../utils";

function PriceCalculator({ message }) {
  const [currency, setCurrency] = useState<CurrencyExchange>();
  return (
    <>
      <div>
        <Paper elevation={3}>
          USD:
          {formatCurrency(
            GetFiatAmount({
              CurrencyAmount: currency?.CurrencyAmount ?? 1,
              CryptoAmount: currency?.CryptoAmount ?? 1,
            })
          )}
        </Paper>

        <TextField
          className="text-secondary"
          id="btc-amount"
          label="BTC AMOUNT:"
          value={currency?.CurrencyAmount}
          type="number"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCurrency({
              CurrencyAmount: StringToNumber(event.target.value),
              CryptoAmount: message,
            });
          }}
        />
      </div>
    </>
  );
}

export default PriceCalculator;
