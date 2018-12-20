import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CreateProvider {

  constructor(public http: HttpClient) {
    console.log('Hello CreateProvider Provider');
  }

  createProdTienda(nombre,detalle,tiendaid,precio,categoriaid,imagenes):Observable<any>{
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearproductotienda.php";
    return
  }

  createProdUser(nombre,detalle,usuarioid,precio,categoriaid,imagenes):Observable<any>{
    //imagenes array de base64;
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php";
    return
  }


}
