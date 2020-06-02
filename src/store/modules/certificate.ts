import {VuexModule, Module, Mutation, Action} from 'vuex-module-decorators'
import {ICertificate} from "@/interfaces/interfaces";
import Store from '../index';
import {generateID, getFirebaseDB, retrieveData} from "@/helper/helperFunctions";
import firebase from "firebase";
import DataSnapshot = firebase.database.DataSnapshot;

const dbCertificate = getFirebaseDB().ref('data/certificate');

@Module({
    dynamic: true,
    store: Store,
    name: "Certificate",
    namespaced: true
})
class Certificate extends VuexModule {
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

    @Mutation
    public deleteCertificate(fbID: string): void {
        const index = this.certificates.findIndex((certificate: ICertificate) => certificate.fbID === fbID);
        this.certificates.splice(index, 1);
    }


    @Mutation
    updateCertificate(updatedCertificate: ICertificate): void {
        this.certificates = this.certificates.map((certificate: ICertificate) => certificate.fbID === updatedCertificate.fbID ? updatedCertificate : certificate);
    }

    @Action
    public fetchCertificates(): void {
        dbCertificate.once('value')
            .then((snapshot: DataSnapshot) => {
                const certificates: ICertificate[] = retrieveData(snapshot.val()) as ICertificate[];
                if (certificates) {
                    this.context.commit('setCertificates', certificates);
                }
            });
    }


    @Action
    public addCertificateAction(certificate: ICertificate): void {
        dbCertificate
            .push(certificate)
            .then(res => this.context.commit('addCertificate', {...certificate, fbID: res.key}))
    }

    @Action
    public deleteCertificateAction(certificate: ICertificate): void {
        dbCertificate
            .child(certificate.fbID)
            .set(null)
            .then(() => {
                firebase.storage().ref(certificate.fullFirebasePath).delete();
                this.context.commit('deleteCertificate', certificate.fbID);
            });
    }

    @Action
    public updateCertificateAction(certificate: ICertificate): void {
        dbCertificate
            .child(certificate.fbID)
            .set(certificate)
            .then(() => this.context.commit('updateCertificate', certificate));
    }

    @Action
    public updateCertificateDemoAction(certificate: ICertificate): void {
        this.context.commit('updateCertificate', certificate)
    }

    @Action
    public deleteCertificateDemoAction(certificate: ICertificate): void {
        this.context.commit('deleteCertificate', certificate.fbID);
    }

    @Action
    public addCertificateDemoAction(certificate: ICertificate): void {
        const id = generateID();
        this.context.commit('addCertificate', {...certificate, fbID: id});
    }
}


export default Certificate;
