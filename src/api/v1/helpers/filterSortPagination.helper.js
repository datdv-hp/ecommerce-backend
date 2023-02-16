const filterSortPagination = async (Model, queries) => {
  try {
    const excludeFields = ['page', 'sort', 'limit', 'fields'];

    // filtering
    let queryStr = JSON.stringify(queries);
    queryStr = queryStr.replace(
      /\b(gt|gte|lt|lte)\b/g,
      (matched) => `$${matched}`
    );

    const queryObj = await JSON.parse(queryStr);
    excludeFields.forEach((_) => {
      delete queryObj._;
    });

    // sorting
    let sortBy = queries.sort?.replace(/,/g, ' ') || '-createdAt'; // default sort by timestamp create, DESC

    // limiting fields
    let fields = queries.fields?.replace(/,/g, ' ') || '-__v'; // hide __v atrribute of product

    // pagination
    let page = queries.page || 1;
    const limit = queries.limit || 5;
    let skip = (page - 1) * limit;
    const total = await Model.countDocuments();
    if (skip >= total) {
      page = Math.ceil(total / limit);
      skip = limit * (page - 1);
    }
    return {
      queryObj,
      fields,
      sortBy,
      skip,
      limit,
    };
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = filterSortPagination;
