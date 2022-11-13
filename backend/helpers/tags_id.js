const Tags = require('../models/Tags');

const tasgId = async tags => {
  return await Promise.all(
    tags.map(async tag => {
      const findTagsId = await Tags.findOne({ tag_name: tag });

      if (findTagsId) {
        return await findTagsId.id;
      }

      const newTagsId = new Tags({ tag_name: tag });

      await newTagsId.save();
      return await newTagsId.id;
    })
  );
};

module.exports = tasgId;
