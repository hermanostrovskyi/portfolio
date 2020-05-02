import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {IPortfolioItem} from "@/interfaces/interfaces";
import Store from '../index';
import {getFirebaseDB, retrieveData} from "@/helper/helperFunctions";
import firebase from "firebase";

const dbPortfolio = getFirebaseDB().ref('data/portfolio');


@Module({
    dynamic: true,
    store: Store,
    name: "Portfolio",
    namespaced: true
})
class Portfolio extends VuexModule {
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

    @Mutation
    updatePortfolioItem(updatedPortfolioItem: IPortfolioItem): void {
        this.portfolio = this.portfolio.map((portfolioItem: IPortfolioItem) => portfolioItem.fbID === updatedPortfolioItem.fbID ? updatedPortfolioItem : portfolioItem);
    }

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

    @Action
    public updatePortfolioItemAction(portfolioItem: IPortfolioItem): void {
        dbPortfolio
            .child(portfolioItem.fbID)
            .set(portfolioItem)
            .then(() => this.context.commit('updatePortfolioItem', portfolioItem));
    }


}


export default Portfolio;
