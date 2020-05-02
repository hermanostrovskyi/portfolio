import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ICertificate, IPortfolioItem, ISkill} from "@/interfaces/interfaces";
import Store from '../index';
import {getFirebaseDB, retrieveData} from "@/helper/helperFunctions";
import firebase from "firebase";

const dbPortfolio = getFirebaseDB().ref('data/portfolio');


@Module({
    dynamic: true,
    store: Store,
    name: "portfolio",
    namespaced: true
})
class Portfolio extends VuexModule {
    // public portfolioItems: IPortfolioItem[] = [
    //     {id: 1, description: 'Some Description', url: 'https://bashooka.com/wp-content/uploads/2015/08/card-ui-designs-21.jpg'},
    //     {id: 2, description: 'Some Description', url: 'https://bashooka.com/wp-content/uploads/2015/08/card-ui-designs-21.jpg'},
    //     {id: 3, description: 'Some Description', url: 'https://d33wubrfki0l68.cloudfront.net/1bc23771296f6f364a2b34a15c751bf71433a9cc/9f7b2/en/blog/uploads/cards-ui-elements.png'},
    //     {id: 4, description: 'Some Description', url: 'https://file.mockplus.com/image/2018/11/9314c44f-c653-40a6-8ea5-7e1c903feecf.png'},
    //     {id: 5, description: 'Some Description', url: 'https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/5f2233fb-2ad3-476f-8072-264efda04853/5-opt.png'}
    // ];

    public portfolio: IPortfolioItem[] = [];


    get allPortfolioItems(): IPortfolioItem[] {
        return this.portfolio;
    }

    @Mutation
    public addPortfolioItem(portfolioItem: IPortfolioItem): void {
        this.portfolio.push(portfolioItem);
    }

    @Mutation
    public setPortfolio(portfolio: IPortfolioItem[]): void {
        this.portfolio = [...portfolio];
    }

    @Mutation
    public deletePortfolioItem(fbID: string): void {
        const index = this.portfolio.findIndex((portfolioItem: IPortfolioItem) => portfolioItem.fbID === fbID);
        this.portfolio.splice(index, 1);
    }




    // @Mutation
    // public addPortfolioItem(portfolioItem: IPortfolioItem): void {
    //     this.portfolioItems.push(portfolioItem);
    // }

    // @Mutation
    // public deletePortfolioItem(id: number): void {
    //     const index = this.portfolioItems.findIndex((portfolioItem: IPortfolioItem) => portfolioItem.id === id);
    //     this.portfolioItems.splice(index, 1);
    // }
    //
    // @Mutation
    // updatePortfolioItem(updatedPortfolio: IPortfolioItem): void {
    //     const index = this.portfolioItems.findIndex((portfolioItem: IPortfolioItem) => portfolioItem.id === updatedPortfolio.id);
    //     this.portfolioItems[index] = updatedPortfolio;
    // }
    //
    // @Action
    // public addNewPortfolioItem(portfolioItem: IPortfolioItem): void {
    //     this.context.commit('addPortfolioItem', portfolioItem);
    // }
    //
    // @Action
    // public deleteExistingPortfolioItem(id: number): void {
    //     this.context.commit('deletePortfolioItem', id);
    // }
    //
    // @Action
    // public updateExistingPortfolioItem(experienceRecord: IPortfolioItem): void {
    //     this.context.commit('updateExperience', experienceRecord);
    // }

    @Action
    public fetchPortfolio() {
        dbPortfolio.once('value')
            .then(snapshot => {
                const portfolio: IPortfolioItem[] = retrieveData(snapshot.val()) as IPortfolioItem[];
                if(portfolio) {
                    this.context.commit('setPortfolio', portfolio);
                }
            })
    }

    @Action
    public addPortfolioItemAction(portfolioItem: IPortfolioItem): void {
        dbPortfolio
            .push(portfolioItem)
            .then(res => this.context.commit('addPortfolioItem', {...portfolioItem, fbID: res.key}));
    }

    @Action
    public deletePortfolioItemAction(portfolioItem: IPortfolioItem): void {
        dbPortfolio
            .child(portfolioItem.fbID)
            .set(null)
            .then(() => {
                firebase.storage().ref(portfolioItem.fullFirebasePath).delete();
                this.context.commit('deletePortfolioItem', portfolioItem.fbID);
            });
    }


}


export default Portfolio;
