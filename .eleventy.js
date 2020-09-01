module.exports = function(eleventyConfig) {

  eleventyConfig.addCollection('sortedProjects', function(collectionApi) {
    return collectionApi.getFilteredByTags("projects").sort((a, b) => {
      if (a.data.showcase && !b.data.showcase) {
        return -1;
      } else if (a.data.showcase && b.data.showcase) {
        return a.data.order - b.data.order;
      } else {
        return a.data.order - b.data.order;
      }
    });
  });

  // Get only content that matches a tag
  eleventyConfig.addCollection("mainProjects", function(collectionApi) {
    return collectionApi.getFilteredByTag("projects").filter(function(item) {
      // Side-step tags and do your own filtering
      return "showcase" in item.data;
    }).sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addCollection("secondaryProjects", function(collectionApi) {
    return collectionApi.getFilteredByTag("projects").filter(function(item) {
      // Side-step tags and do your own filtering
      return !("showcase" in item.data);
    }).sort((a, b) => a.data.order - b.data.order);
  })

};