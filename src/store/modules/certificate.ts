import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ICertificate} from "@/interfaces/interfaces";
import Store from '../index';
import {getFirebaseDB, retrieveData} from "@/helper/helperFunctions";

const dbCertificate = getFirebaseDB().ref('data/certificate');

@Module({
    dynamic: true,
    store: Store,
    name: "Certificate",
    namespaced: true
})
class Certificate extends VuexModule {
    // public certificates: ICertificate[] = [
    //     {
    //         id: 1,
    //         title: 'First certificate',
    //         url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftraining.proprofs.com%2Fhow-do-i-create-customize-and-brand-a-course-certificate&psig=AOvVaw04cBOgazo4k_s2CoU6UFpU&ust=1588187076956000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiS_Yvoi-kCFQAAAAAdAAAAABAT'
    //     },
    //     {
    //         id: 2,
    //         title: 'Second certificate',
    //         url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftraining.proprofs.com%2Fhow-do-i-create-customize-and-brand-a-course-certificate&psig=AOvVaw04cBOgazo4k_s2CoU6UFpU&ust=1588187076956000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiS_Yvoi-kCFQAAAAAdAAAAABAT'
    //     },
    //     {
    //         id: 3,
    //         title: 'Third certificate',
    //         url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftraining.proprofs.com%2Fhow-do-i-create-customize-and-brand-a-course-certificate&psig=AOvVaw04cBOgazo4k_s2CoU6UFpU&ust=1588187076956000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiS_Yvoi-kCFQAAAAAdAAAAABAT'
    //     },
    //     {
    //         id: 4,
    //         title: 'Fourth certificate',
    //         url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftraining.proprofs.com%2Fhow-do-i-create-customize-and-brand-a-course-certificate&psig=AOvVaw04cBOgazo4k_s2CoU6UFpU&ust=1588187076956000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiS_Yvoi-kCFQAAAAAdAAAAABAT'
    //     },
    //     {
    //         id: 5,
    //         title: 'Fifth certificate',
    //         url: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ftraining.proprofs.com%2Fhow-do-i-create-customize-and-brand-a-course-certificate&psig=AOvVaw04cBOgazo4k_s2CoU6UFpU&ust=1588187076956000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCIiS_Yvoi-kCFQAAAAAdAAAAABAT'
    //     }
    // ];

    certificates: ICertificate[] = [];

    get allCertificates(): ICertificate[] {
        return this.certificates;
    }


    @Mutation
    public addCertificate(certificate: ICertificate): void {
        this.certificates.push(certificate);
    }

    @Mutation
    public setCertificates(certificates: ICertificate[]): void {
        this.certificates = [...certificates];
    }

    // @Mutation
    // public deleteCertificate(id: number): void {
    //     const index = this.certificates.findIndex((certificate: ICertificate) => certificate.id === id);
    //     this.certificates.splice(index, 1);
    // }
    //
    // @Mutation
    // updateCertificate(certificate: ICertificate): void {
    //     const index = this.certificates.findIndex((certificateItem: ICertificate) => certificateItem.id === certificate.id);
    //     this.certificates[index] = certificate;
    // }
    //
    // @Action
    // public addNewCertificate(certificate: ICertificate): void {
    //     this.context.commit('addCertificate', certificate);
    // }
    //
    // @Action
    // public deleteExistingCertificate(id: number): void {
    //     this.context.commit('deleteCertificate', id);
    // }
    //
    // @Action
    // public updateExistingCertificate(certificate: ICertificate): void {
    //     this.context.commit('updateCertificate', certificate);
    // }

    @Action
    public fetchCertificates() {
        dbCertificate.once('value')
            .then(snapshot => {
                const certificates: ICertificate[] = retrieveData(snapshot.val()) as ICertificate[];
                if(certificates) {
                    this.context.commit('setCertificates', certificates);
                }
            })
    }


    @Action
    public addCertificateAction(certificate: ICertificate): void {
        dbCertificate
            .push(certificate)
            .then(res => this.context.commit('addCertificate', {...certificate, fbID: res.key}))
    }
}


export default Certificate;
