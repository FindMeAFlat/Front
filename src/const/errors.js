export default {
    criteria: {
        url: "Url is not valid or doesn't contain ${lat} and ${lon}",
        requestsLimit: 'Limit of requests must be a number larger than 50 or empty',
        propertyAccess: "Property access must be strings separated by dot (e.g. 'prop1.prop2.prop3')",
        minRatingValue: 'Min rating must be smaller than max rating',
        maxRatingValue: 'Max rating must be larger than min rating',
        importance: 'Importance must be a number from range 1-100',
        mustBeFilled: 'Field must be filled',
    },
    search: 'You have to choose correct address...',
};
