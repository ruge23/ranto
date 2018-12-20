import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http'
import { tap } from 'rxjs/operators/tap';
import { Observable } from 'rxjs/Observable';
import { Storage } from '@ionic/storage';


@Injectable()
export class ServicesProvider {

  categorias: any = [];
  eventos: evento;
  usuarioId: number = 1;
  fbIdUser:any;
  _usuario = new usuario();

  constructor(private httpPost: Http, private http: HttpClient, private storage: Storage) {
    console.log('Hello ServicesProvider Provider');
  }

  actualizarUsuario(nombre, apellido, fechanacimiento, email, localidad, direccion, telefono): Observable<any> {
    var headers = new Headers();
   headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });
 
 
    var body = JSON.stringify({ usuarioid: this.usuarioId ,nombre: nombre, apellido: apellido, fechanacimiento: fechanacimiento, email: email, direccion: direccion, telefono: telefono, localidad: localidad});
    console.log(body);
    return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/actualizarusuario.php", body, { headers: headers, withCredentials: true });
 
 
  }

  crearusuario(nombre, apellido, fechanacimiento, email, password, localidad, direccion, telefono): Observable<any> {
    var headers = new Headers();
   headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json'); 
    headers.append('content-type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });


    var body = JSON.stringify({ nombre: nombre, apellido: apellido, fechanacimiento: fechanacimiento, email: email, contrasenia: password, direccion: direccion, telefono: telefono, localidad: localidad, facebookid: 1 });
    console.log(body);
    return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/registrarusuario.php", body, { headers: headers, withCredentials: true });


  }
/*   crearusuario(nombre, apellido, fechanacimiento, email, password, localidad, direccion, telefono): Observable<any> {
    console.log("id persona",this.usuarioId)
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?nombre=' + nombre+ "&apellido=" + apellido+ "&apellido=" +fechanacimiento+ this.nombre+ "&apellido=" + this.email+ this.nombre+ "&apellido=" + this.password+ this.nombre+ "&apellido=" + this.localidad+ this.nombre+ "&apellido=" + this.direccion+ this.nombre+ "&apellido=" + this.telefono);

  } */
  login(name: string, pw: string): Observable<any> {
    return this.http.get("http://ctrlztest.com.ar/ranto/apirest/validarusuario.php?usuario=" + name + "&password=" + pw)
      .pipe(
        tap(x => {
         
        })
      );
  }

  setUserId(userid) {
    console.log("set id", userid)
    this.storage.set("_uid_", userid);
    this.usuarioId = userid;
  }
  //traerUsuario
  getUserporid(userid) {
    console.log("id persona",userid)
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?usuarioid=' + userid);

  }

  getMisDatos() {
    console.log("id persona",this.usuarioId)
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?usuarioid=' + this.usuarioId);

  }

  
  getProvinciasYLocalidades() {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerprovinciasylocalidades.php');

  }

  //traermiscategorias.php
  getCategories(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercategorias.php');
  }

  //traerproductoscategoria.php
  getProdxCategoria(categoriaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductoscategoria.php?categoriaid=' + categoriaid);
  }

  getProductosPorUsuario(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductosusuario.php?usuarioid=' + this.usuarioId);
  }

  getProductosPorTienda(tiendaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductostienda.php?tiendaid=' + tiendaid);
  }

  getProductosPorCategoria(categoriaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductoscategoriausuario.php?categoriaid='+ categoriaid+'&usuarioid='+this.usuarioId );
  }

  getCVPorUsuario(uid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercvporusuario.php?usuarioid=' + uid);
  }

  getMiCV(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercvporusuario.php?usuarioid=' + this.usuarioId);
  }

  getSlides(): Observable<any> {
    return this.http.get('../../assets/data/slides-mok.json');
  }

  getClasificados(): Observable<any> {
    return this.http.get('../../assets/data/clasificados-mok.json');
  }

  getMisComercios(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermistiendas.php?usuarioid=' + this.usuarioId);
  }

  getPuestosPorTienda(tiendaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerpuestosportienda.php?tiendaid=' + tiendaid);
  }

  getVouchersPorTienda(tiendaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traervouchersportienda.php?tiendaid=' + tiendaid);
  }

  usarVoucher(voucherid): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/usarvoucher.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({usuarioid:this.usuarioId,voucherid:voucherid});

    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  borrarVoucher(voucherid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/borrarvoucherusuario.php?usuarioid=' + this.usuarioId + '&voucherid=' + voucherid);
  }

  borrarFavorito(productid): Observable<any>{
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/borrarfavoritoproducto.php?productoid='+ productid + '&usuarioid=' + this.usuarioId);    
  }

  setGuardarProdFav(productid): Observable<any>{
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    var body = JSON.stringify({ ususarioid: this.usuarioId, productoid: productid})

    return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/crearfavoritoproducto.php", body, { headers: headers, withCredentials: true })
  }
  
  setGuardarCategoriasFav(cat1, cat2, cat3, cat4): Observable<any> {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });


    var body = JSON.stringify({ usuarioid: this.usuarioId, categoriaid1: cat1, categoriaid2: cat2, categoriaid3: cat3, categoriaid4: cat4 });

    return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/guardarcategoriasfav.php", body, { headers: headers, withCredentials: true })
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
      );

  }

  setPostularsePuesto(puestoid): Observable<any> {
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');
    const requestOptions = new RequestOptions({ headers: headers });


    var body = JSON.stringify({ usuarioid: this.usuarioId, puestoid: puestoid });

    return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/postularsepuesto.php", body, { headers: headers, withCredentials: true })
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
      );
  }

/*   http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php
  nombre,detalle,usuarioid,precio,categoriaid,imagenes */

  crearProductoUsuario(nombre,detalle,precio,categoriaid,imagenes): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({nombre:nombre,detalle:detalle,precio:precio,categoriaid:categoriaid,imagenes:imagenes,usuarioid: this.usuarioId,fechapublicacion: new Date()});
    console.log("params crear prod",body);
    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  crearProductoTienda(nombre,detalle,precio,categoriaid,imagenes,tiendaid): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearproductotienda.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({nombre:nombre,detalle:detalle,precio:precio,categoriaid:categoriaid,imagenes:imagenes,tiendaid: tiendaid,fechapublicacion: new Date()});
    console.log("body tienda", body);
    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  crearPuestoTrabajo(tiendaid,titulo,lugar,cargahorariaid,areaid,salario,horario,detalle): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearpuesto.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({tiendaid:tiendaid,titulo:titulo,direccion:lugar,cargahorariaid:cargahorariaid,areaid:areaid,salario:salario,fechapublicacion: new Date(),horario:horario,detalle:detalle});

    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  crearTienda(nombre, direccion, telefono, imagen): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/creartienda.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });
   // console.log("uid", this.usuarioId, this._usuario.usuarioid)
    var body = JSON.stringify({nombre:nombre,direccion:direccion,telefono:telefono,imagen:imagen, usuarioid: this.usuarioId});

    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  //POST CREAR CLASIFICADO
  crearClasificado(titulo, detalle): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearclasificado.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({titulo: titulo, detalle: detalle});

    return this.httpPost.post(url, body, { headers: headers, withCredentials: true })
      .pipe(
        tap(data => console.log('All: ' + JSON.stringify(data)))
      )
  }

  crearVocuher(tiendaid,titulo,detalle,fechavencimiento,cantidad): Observable<any> {
    let url = "http://ctrlztest.com.ar/ranto/apirest/crearvoucher.php";
    var headers = new Headers();
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
    headers.append('Accept', 'application/json');
    headers.append('content-type', 'application/json');

    const requestOptions = new RequestOptions({ headers: headers });

    var body = JSON.stringify({tiendaid:tiendaid,titulo:titulo,fechapublicacion: new Date() ,fechavencimiento:fechavencimiento,cantidad:cantidad,detalle:detalle});

    return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
  }

  getPostulados(puestoid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerpostuladosporpuesto.php?puestoid=' + puestoid);
  }


  getMisCategorias(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermiscategorias.php?usuarioid=' + this.usuarioId);
  }

  getPuestosyClasificados(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerbusquedasyclasificados.php');
  }

  //traermisvouchers.php
  getMisVouchers(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermisvouchers.php?usuarioid=' + this.usuarioId);
  }

  //traermisfavoritos
  getMisFavoritos(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermisfavoritos.php?usuarioid=' + this.usuarioId);
  }

  //traereventos.php
  getEventos(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traereventos.php');
  }

  //traerultimosproductos.php
  getUltimosSubidos(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerultimosproductos.php');
  }

  getTiendaPorId(tiendaid): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traertiendaporid.php?tiendaid=' + tiendaid);
  }


  //busqueda productos autocomplete
  buscarProductosAuto(val): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaprodsauto.php?texto=' + val);
  }

  //busqueda productos
  buscarProductos(val, desde): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaprods.php?texto=' + val + '&desde=' + desde);
  }

  //busqueda empleos autocomplete
  buscarEmpleosAuto(val): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaempleosauto.php?texto=' + val);
  }

  //busqueda empleos
  buscarEmpleos(val, desde): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaempleos.php?texto=' + val + '&desde=' + desde)
  }

  getAreayYCargahoraria(): Observable<any> {
    return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerareaycargahoraria.php')
  }

    

  /*
  


http://ctrlztest.com.ar/ranto/apirest/traerproductosusuario.php
usuarioid

http://ctrlztest.com.ar/ranto/apirest/traertiendaporid.php
tiendaid

http://ctrlztest.com.ar/ranto/apirest/traervouchersportienda.php
tiendaid
http://ctrlztest.com.ar/ranto/apirest/validarusuario.php
usuario,password

http://ctrlztest.com.ar/ranto/apirest/traermiscategorias.php
usuarioid
http://ctrlztest.com.ar/ranto/apirest/traermisvouchers.php
usuarioid

BORRAR

http://ctrlztest.com.ar/ranto/apirest/borrarfavoritoproducto.php
productoid,usuarioid
http://ctrlztest.com.ar/ranto/apirest/borrarproducto.php
productoid
http://ctrlztest.com.ar/ranto/apirest/borrarpuesto.php
puestoid
http://ctrlztest.com.ar/ranto/apirest/borrartienda.php
tiendaid
http://ctrlztest.com.ar/ranto/apirest/borrarvoucher.php
voucherid
http://ctrlztest.com.ar/ranto/apirest/borrarvoucherusuario.php
voucherid,usuarioid


*/
}
export class evento {
  eventoid: number;
  titulo: string;
  detalle: string;
  imgpath: string;
}
export class usuario {
  usuarioid: number;
  nombre: string;
  apellido: string;
  localidad: string;
  localidadid: number;
  fechanacimiento: Date;
}