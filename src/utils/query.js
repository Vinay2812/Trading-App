export const processQueryOutput = {
    forFindAll: (data) => data.map(({ dataValues }) => dataValues),
    forUpdate: (data) => {
      let output =
        data instanceof Array
          ? data.map(({ dataValues }) => dataValues)
          : [data?.dataValues];
      return output;
    },
    forInsert: (data) => (data ? data.dataValues : null),
  };