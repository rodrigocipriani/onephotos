const utilsHelper = {};

utilsHelper.newMessage = props => {
  const { text, type } = props;
  return { text, type: type || "default" };
};

utilsHelper.errorCatch = me => err => {
  console.error("Error: ", err);
  return me.next(err);
};

utilsHelper.returningThen = data => data;

module.exports = utilsHelper;
