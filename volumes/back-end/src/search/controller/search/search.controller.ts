import { Controller, Get, Param } from '@nestjs/common';

import { SearchService } from '../../services/search/search.service';

@Controller('search')
export class SearchController {

    constructor(private searchService: SearchService) { }
    
    @Get(':query')
    search(@Param('query') query: string) {
        return this.searchService.search(query);
    }

}
