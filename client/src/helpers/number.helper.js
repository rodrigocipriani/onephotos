const formatCurrency = props => {
  const value = props.value || 0;
  const hideCurrencyPrefix = props.hideCurrencyPrefix || false;

  let options = {
    currency: "BRL",
    style: "currency"
  };
  let retorno = new Intl.NumberFormat("pt-BR", options).format(value);
  if (hideCurrencyPrefix) {
    return retorno.replace("R$", "");
  }
  return retorno;
};
export default { formatCurrency };
