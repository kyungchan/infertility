const boardModel = require("../odm/post");

module.exports = (function () {
  let recentCount = 0;

  return {
    setRecentCount: function () {
      boardModel
        .countDocuments({
          createdAt: {
            $gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000), // 7일전
          },
        })
        .then((result) => {
          recentCount = result;
        })
        .catch((err) => {
          console.log(err);
          recentCount = 0;
        });
    },
    getRecentCount: function () {
      return recentCount;
    },
  };
})();
