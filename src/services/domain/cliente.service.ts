import { ImageUtilService } from './../image-util.service';
import { StorageService } from './storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { Observable } from 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { ClienteDTO } from 'src/models/cliente.dto';

@Injectable()
export class ClienteService {
    constructor(
        public http: HttpClient,
        public storage: StorageService,
        public imageUtilService: ImageUtilService
    ) { }

    findById(id: string) {
        return this.http.get(
            `${API_CONFIG.baseURl}/clientes/${id}`
        );
    }

    findByEmail(email: string) {

        // let token = this.storage.getLocalUser().token;
        // let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token});

        return this.http.get(
            `${API_CONFIG.baseURl}/clientes/email?value=${email}` //,{'headers': authHeader}
        );
    }

    getImageFromBucket(id: string): Observable<any> {
        let url = `${API_CONFIG.backetBaseUrl}/cp${id}.jpg`
        return this.http.get(url, { responseType: 'blob' });

    }


    insert(obj: ClienteDTO) {
        return this.http.post(
            `${API_CONFIG.baseURl}/clientes`,
            obj,
            {
                observe: 'response',
                responseType: 'text'
            }
        )

    }

    uploadPicture(picture) {
        let pictureBlob = this.imageUtilService.dataUriToBlob(picture)
        let formData: FormData = new FormData();

        formData.set('file', pictureBlob, 'file.png');

        return this.http.post(
            `${API_CONFIG.baseURl}/clientes/picture`,
            formData,
            {
                observe: 'response',
                responseType: 'text'
            }
        )
    }
}