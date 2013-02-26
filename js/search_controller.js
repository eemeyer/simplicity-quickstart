(function ($, window) {
    window.search_controller = function (state) {
        var pageSize = 10;
        var request = {
            criteria: [],
            properties: [],
            highlighting: {
                template: ['<span class="ui-state-highlight">', '</span>']
            },
            facets: {
                genre: {
                    sortBy: 'countDesc',
                    topN: 15
                }
            },
            startIndex: state.page ? (pageSize * (state.page - 1)) : 0,
            pageSize: pageSize
        };
        if (state.q) {
            request.criteria.push({
                dimension: 'freetext',
                value: state.q,
                cull: true
            });
        }
        if (state.genre) {
            request.criteria.push({
                dimension: 'genre',
                id: state.genre
            });
        }
        if (request.criteria.length ===  0) {
            // If no search criteria were provided, we can
            // configure a default search here.
            request.criteria.push({dimension: '_kind'});
        }
        return request;
    };
})($, window);