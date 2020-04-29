import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IPortfolioItem} from "@/interfaces/interfaces";
import Store from '../index';

@Module({
    dynamic: true,
    store: Store,
    name: "portfolio",
    namespaced: true
})
class Portfolio extends VuexModule {
    public portfolioItems: IPortfolioItem[] = [
        {id: 1, description: 'Some Description', url: 'https://bashooka.com/wp-content/uploads/2015/08/card-ui-designs-21.jpg'},
        {id: 2, description: 'Some Description', url: 'https://bashooka.com/wp-content/uploads/2015/08/card-ui-designs-21.jpg'},
        {id: 3, description: 'Some Description', url: 'https://d33wubrfki0l68.cloudfront.net/1bc23771296f6f364a2b34a15c751bf71433a9cc/9f7b2/en/blog/uploads/cards-ui-elements.png'},
        {id: 4, description: 'Some Description', url: 'https://file.mockplus.com/image/2018/11/9314c44f-c653-40a6-8ea5-7e1c903feecf.png'},
        {id: 5, description: 'Some Description', url: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5f2233fb-2ad3-476f-8072-264efda04853/5-opt.png'}
    ];


    get allPortfolioItems(): IPortfolioItem[] {
        return this.portfolioItems;
    }


    @Mutation
    public addPortfolioItem(portfolioItem: IPortfolioItem): void {
        this.portfolioItems.push(portfolioItem);
    }

    @Mutation
    public deletePortfolioItem(id: number): void {
        const index = this.portfolioItems.findIndex((portfolioItem: IPortfolioItem) => portfolioItem.id === id);
        this.portfolioItems.splice(index, 1);
    }

    @Mutation
    updatePortfolioItem(updatedPortfolio: IPortfolioItem): void {
        const index = this.portfolioItems.findIndex((portfolioItem: IPortfolioItem) => portfolioItem.id === updatedPortfolio.id);
        this.portfolioItems[index] = updatedPortfolio;
    }

    @Action
    public addNewPortfolioItem(portfolioItem: IPortfolioItem): void {
        this.context.commit('addPortfolioItem', portfolioItem);
    }

    @Action
    public deleteExistingPortfolioItem(id: number): void {
        this.context.commit('deletePortfolioItem', id);
    }

    @Action
    public updateExistingPortfolioItem(experienceRecord: IPortfolioItem): void {
        this.context.commit('updateExperience', experienceRecord);
    }

}


export default Portfolio;
