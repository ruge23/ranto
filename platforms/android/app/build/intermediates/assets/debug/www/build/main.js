webpackJsonp([28],{

/***/ 121:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProdPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateProdPage = /** @class */ (function () {
    function CreateProdPage(navCtrl, navParams, alertCtrl, services, camera, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.services = services;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.categorias = [];
        this.imageBox = [];
        this.showMsgError = false;
        this.msgError = "";
        this.tiendaid = this.navParams.data;
        console.log("tiendaid", this.tiendaid);
        services.getCategories().subscribe(function (x) {
            _this.categorias = JSON.parse(x["data"]);
        });
    }
    CreateProdPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProdPage');
    };
    CreateProdPage.prototype.guardarProd = function () {
        var _this = this;
        if (this.validacion()) {
            this.services.crearProductoTienda(this.nombreProd, this.detalleProd, this.precioProd, this.categoria, this.imageBox, this.tiendaid).subscribe(function (x) {
                _this.toastExito();
                _this.navCtrl.pop();
            });
        }
        else {
            //msgerror	
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateProdPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.nombreProd == "") {
            ret = false;
            msg += "Debe completar el nombre";
        }
        if (this.detalleProd == "") {
            ret = false;
            msg += "Debe completar el detalle";
        }
        if (this.imageBox.length == 0) {
            ret = false;
            msg += "Debe agregar al menos una imagen";
        }
        if (this.precioProd == 0) {
            ret = false;
            msg += "Debe completar el precio";
        }
        if (this.categoria == 0) {
            ret = false;
            msg += "Debe seleccionar una categoria";
        }
        this.msgError = msg;
        return ret;
    };
    CreateProdPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateProdPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateProdPage.prototype.abrirGaleria = function () {
        var _this = this;
        var options = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imageBox.push(_this.base64Image);
            console.log('ArrayImage', _this.imageBox);
        }, function (err) {
            console.log('err en getPicture', err);
        });
    };
    CreateProdPage.prototype.eliminarImg = function (index) {
        this.imageBox.splice(index, 1);
    };
    CreateProdPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-prod',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-prod/create-prod.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Crear Producto</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input type="text" [(ngModel)]="nombreProd" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Detalle</ion-label>\n      <ion-textarea type="text" [(ngModel)]="detalleProd" clearInput></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Precio</ion-label>\n      <ion-input type="number" [(ngModel)]="precioProd" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Categoria</ion-label>\n      <ion-select okText="Ok" cancelText="Cancelar" [(ngModel)]="categoria">\n        <ion-option *ngFor="let cat of categorias" [value]="cat.categoriaid">{{cat.nombre}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <button ion-button (click)="abrirGaleria()">Seleccionar imagenes</button>\n    </ion-item>\n\n    <ion-item *ngIf="imageBox.length > 0">\n      <ion-card *ngFor="let img of imageBox; let i = index">\n        <img src="{{img}}" />\n        <ion-card-content>\n        </ion-card-content>\n        <ion-row no-padding>\n          <ion-col text-right>\n            <button ion-button clear small color="danger" (click)="eliminarImg(i)" icon-start>\n              <ion-icon name=\'share-alt\'></ion-icon>\n              Borrar\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-item>\n\n  </ion-list>\n\n  <div padding>\n    <button ion-button block (click)="guardarProd()">Guardar</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-prod/create-prod.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], CreateProdPage);
    return CreateProdPage;
}());

//# sourceMappingURL=create-prod.js.map

/***/ }),

/***/ 122:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateTiendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the CreateTiendaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CreateTiendaPage = /** @class */ (function () {
    function CreateTiendaPage(navCtrl, navParams, services, camera, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.imageBox = [];
        this.showMsgError = false;
        this.msgError = "";
    }
    CreateTiendaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateTiendaPage');
    };
    CreateTiendaPage.prototype.crearTienda = function () {
        var _this = this;
        if (this.validacion()) {
            this.services.crearTienda(this.nombre, this.direccion, this.telefono, this.imageBox).subscribe(function (x) {
                _this.toastExito();
                _this.navCtrl.pop();
            });
        }
        else {
            //msgerror		
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateTiendaPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.nombre == "") {
            ret = false;
            msg += "Debe completar el nombre";
        }
        if (this.direccion == "") {
            ret = false;
            msg += "Debe completar la direccion";
        }
        if (this.imageBox.length == 0) {
            ret = false;
            msg += "Debe agregar al menos una imagen";
        }
        if (this.telefono == "") {
            ret = false;
            msg += "Debe completar el telefono";
        }
        this.msgError = msg;
        return ret;
    };
    CreateTiendaPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateTiendaPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateTiendaPage.prototype.abrirGaleria = function () {
        var _this = this;
        var options = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imageBox.push(_this.base64Image);
            console.log('ArrayImage', _this.imageBox);
        }, function (err) {
            console.log('err en getPicture', err);
        });
    };
    CreateTiendaPage.prototype.eliminarImg = function (index) {
        this.imageBox.splice(index, 1);
    };
    CreateTiendaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-tienda',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-tienda/create-tienda.html"*/'<!--\n  Generated template for the CreateTiendaPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Crear tienda</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input type="text" clearInput [(ngModel)]="nombre"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Direccion</ion-label>\n      <ion-textarea type="text" [(ngModel)]="direccion"></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Telefono</ion-label>\n      <ion-input type="text" [(ngModel)]="telefono"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <button ion-button (click)="abrirGaleria()" [disabled]="imageBox.length == 1">Seleccionar imagenes</button>\n    </ion-item>\n\n    <ion-item *ngIf="imageBox.length > 0">\n      <ion-card *ngFor="let img of imageBox; let i = index">\n        <img src="{{img}}" />\n        <ion-card-content>\n        </ion-card-content>\n        <ion-row no-padding>\n          <ion-col text-right>\n            <button ion-button clear small color="danger" (click)="eliminarImg(i)" icon-start>\n              <ion-icon name=\'share-alt\'></ion-icon>\n              Borrar\n            </button>\n          </ion-col>\n        </ion-row>\n      </ion-card>\n    </ion-item>\n  </ion-list>\n  <div padding>\n    <button ion-button block (click)="crearTienda()">Crear</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-tienda/create-tienda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */]])
    ], CreateTiendaPage);
    return CreateTiendaPage;
}());

//# sourceMappingURL=create-tienda.js.map

/***/ }),

/***/ 123:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CurriculumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the CurriculumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var CurriculumPage = /** @class */ (function () {
    function CurriculumPage(navCtrl, navParams, serviceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.postulado = [];
        this.serviceProvider.getMiCV().subscribe(function (x) {
            console.log("el cv", JSON.parse(x['data'])[0]);
            _this.postulado = JSON.parse(x['data'])[0];
            if (_this.postulado.experiencia == null || _this.postulado.experiencia == undefined) {
                _this.postulado.experiencia = [];
            }
            console.log("nombre", _this.postulado.nombre);
        });
    }
    CurriculumPage.prototype.calcularEdad = function (birthday) {
        var fecha = new Date(birthday);
        var ageDifMs = Date.now() - fecha.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    CurriculumPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerCurriculumPage');
    };
    CurriculumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-curriculum',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/curriculum/curriculum.html"*/'<!--\n  Generated template for the VerCurriculumPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n    <ion-navbar>\n      <ion-title>ver-curriculum</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  <ion-content>\n      <img class="profile-image" src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n      <h1>{{postulado.nombre}} {{postulado.apellido}}</h1>\n      <p>Edad: {{calcularEdad(postulado.fechanacimiento)}}</p>\n      <p>Direccion: {{postulado.direccion}}</p>\n      <p>Telefono: {{postulado.telefono}}</p>\n       <ion-list *ngIf="postulado.experiencias">\n        <ion-list-header>\n          Experiencias laborales\n        </ion-list-header>\n        <ion-item *ngFor="let experiencia of postulado.experiencias">\n          <h1>{{experiencia.titulo}}</h1>\n          <p>{{experiencia.detalle}}</p>\n        </ion-item>\n      </ion-list>\n      <ion-list *ngIf="postulado.estudios">\n        <ion-list-header>\n          Estudios\n        </ion-list-header>\n        <ion-item *ngFor="let estudio of postulado.estudios">\n          <h1>{{estudio.titulo}}</h1>\n          <p>{{estudio.detalle}}</p>\n        </ion-item>\n      </ion-list>\n  </ion-content>\n  '/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/curriculum/curriculum.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], CurriculumPage);
    return CurriculumPage;
}());

//# sourceMappingURL=curriculum.js.map

/***/ }),

/***/ 124:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VerCurriculumPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the VerCurriculumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var VerCurriculumPage = /** @class */ (function () {
    function VerCurriculumPage(navCtrl, navParams, serviceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.postulado = [];
        console.log("el id", this.navParams.data);
        this.serviceProvider.getCVPorUsuario(this.navParams.data).subscribe(function (x) {
            console.log("el cv", JSON.parse(x['data'])[0]);
            _this.postulado = JSON.parse(x['data'])[0];
            if (_this.postulado.experiencia == null || _this.postulado.experiencia == undefined) {
                _this.postulado.experiencia = [];
            }
            console.log("nombre", _this.postulado.nombre);
        });
    }
    VerCurriculumPage.prototype.calcularEdad = function (birthday) {
        var fecha = new Date(birthday);
        var ageDifMs = Date.now() - fecha.getTime();
        var ageDate = new Date(ageDifMs); // miliseconds from epoch
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    };
    VerCurriculumPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VerCurriculumPage');
    };
    VerCurriculumPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-ver-curriculum',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/ver-curriculum/ver-curriculum.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ver curriculum</ion-title>\n  </ion-navbar>\n \n </ion-header>\n \n \n <ion-content padding>\n    <img class="profile-image" src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n    <h1 style="color: #73acd9">{{postulado.nombre}} {{postulado.apellido}}</h1>\n    <p>Edad: {{calcularEdad(postulado.fechanacimiento)}}</p>\n    <p>Direccion: {{postulado.direccion}}</p>\n    <p>Telefono: {{postulado.telefono}}</p>\n     <ion-list *ngIf="postulado.experiencias">\n      <ion-list-header>\n        Experiencias laborales\n      </ion-list-header>\n      <ion-item *ngFor="let experiencia of postulado.experiencias">\n        <h1 style="color: #73acd9">{{experiencia.titulo}}</h1>\n        <p>{{experiencia.detalle}}</p>\n      </ion-item>\n    </ion-list>\n    <ion-list *ngIf="postulado.estudios">\n      <ion-list-header>\n        Estudios\n      </ion-list-header>\n      <ion-item *ngFor="let estudio of postulado.estudios">\n        <h1 style="color: #73acd9">{{estudio.titulo}}</h1>\n        <p>{{estudio.detalle}}</p>\n      </ion-item>\n    </ion-list>\n </ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/ver-curriculum/ver-curriculum.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], VerCurriculumPage);
    return VerCurriculumPage;
}());

//# sourceMappingURL=ver-curriculum.js.map

/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FavoritesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__menu_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_trabajo_trabajo__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_search_search__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_home_home__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_voucher_voucher__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__interna_prod_interna_prod__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var FavoritesPage = /** @class */ (function () {
    function FavoritesPage(navCtrl, navParams, serviceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_5__pages_home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_6__pages_voucher_voucher__["a" /* VoucherPage */];
        //tab3Root = ShopCartPage;
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_4__pages_search_search__["a" /* SearchPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_3__pages_trabajo_trabajo__["a" /* TrabajoPage */];
        this.productos = [];
    }
    FavoritesPage.prototype.ionViewWillEnter = function () {
        this.getFavoritos();
    };
    FavoritesPage.prototype.getFavoritos = function () {
        var _this = this;
        this.serviceProvider.getMisFavoritos().subscribe(function (x) {
            _this.productos = JSON.parse(x["data"]);
        });
    };
    FavoritesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FavoritesPage');
    };
    FavoritesPage.prototype.goToIntProd = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__interna_prod_interna_prod__["a" /* InternaProdPage */], product);
    };
    FavoritesPage.prototype.goto = function (a) {
        console.log('click');
        switch (a) {
            case 2:
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__menu_menu__["a" /* MenuPage */], 1);
                break;
            case 3:
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__menu_menu__["a" /* MenuPage */], 3);
                break;
            case 4:
                this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_0__menu_menu__["a" /* MenuPage */], 4);
        }
    };
    FavoritesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-favorites',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/favorites/favorites.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Favoritos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-grid>\n    <ion-row *ngIf="productos.length > 0">\n      <ion-col *ngFor="let product of productos">\n        <ion-card (click)="goToIntProd(product)">\n          <img src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}" alt="imagen producto">\n          <ion-card-content>\n            <ion-card-header>\n              {{product.nombre}}\n            </ion-card-header>\n            <p>${{product.precio}}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="productos.length == 0">\n      <p>Todavia no tiene favoritos en su lista.</p>\n    </ion-row>\n  </ion-grid>\n\n</ion-content>\n<ion-footer>\n  <ion-toolbar>\n    <ion-tabs color="colorTabs">\n      <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n      <ion-tab [root]="tab2Root" tabTitle="Vouchers" tabIcon="filing" (ionSelect)="goto(2)"></ion-tab>\n      <ion-tab tabTitle="Ranto" tabIcon="finger-print"></ion-tab>\n      <ion-tab [root]="tab3Root" tabTitle="Buscar" tabIcon="search" (ionSelect)="goto(3)"></ion-tab>\n      <ion-tab [root]="tab4Root" tabTitle="Clasificado" tabIcon="paper" (ionSelect)="goto(4)"></ion-tab>\n    </ion-tabs>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/favorites/favorites.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__providers_services_services__["a" /* ServicesProvider */]])
    ], FavoritesPage);
    return FavoritesPage;
}());

//# sourceMappingURL=favorites.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__select_categories_select_categories__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SignupPage = /** @class */ (function () {
    function SignupPage(toastCtrl, navCtrl, navParams, viewCtrl, serviceProvider) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.serviceProvider = serviceProvider;
        this.localidad = 0;
        this.provincias = [];
        this.localidades = [];
        this.localidadesProvincia = [];
        this.showMsgError = false;
        this.msgError = "";
        serviceProvider.getProvinciasYLocalidades().subscribe(function (z) {
            //console.log("prov y loc:",JSON.parse(z["data"]));
            _this.provincias = JSON.parse(z["data"]).provincias;
            _this.localidades = JSON.parse(z["data"]).localidades;
        });
    }
    SignupPage.prototype.onProvinciaChange = function ($event) {
        console.log("evento", $event);
        this.localidadesProvincia = this.localidades.filter(function (f) { return f.provinciaid == $event; });
    };
    SignupPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SignupPage');
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        if (this.validacion()) {
            this.serviceProvider.crearusuario(this.nombre, this.apellido, this.fechanacimiento, this.email, this.password, this.localidad, this.direccion, this.telefono).subscribe(function (x) {
                _this.serviceProvider.setUserId(JSON.parse(JSON.parse(x["_body"])["data"]));
                _this.serviceProvider.getMisDatos().subscribe(function (z) {
                    _this.serviceProvider._usuario = JSON.parse(z["data"]);
                });
                _this.toastExito();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__select_categories_select_categories__["a" /* SelectCategoriesPage */]);
            });
        }
        else {
            //msgerror	
            this.showMsgError = true;
            this.toastError();
        }
    };
    SignupPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.nombre == "") {
            ret = false;
            msg += "Debe completar el nombre";
        }
        if (this.apellido == "") {
            ret = false;
            msg += "Debe completar el apellido";
        }
        if (!this.fechanacimiento) {
            ret = false;
            msg += "Debe completar la fecha de nacimiento";
        }
        if (this.email == "") {
            ret = false;
            msg += "Debe completar el email";
        }
        if (this.password == "") {
            ret = false;
            msg += "Debe completar el password";
        }
        if (this.localidad == 0) {
            ret = false;
            msg += "Debe completar la localidad";
        }
        if (this.direccion == "") {
            ret = false;
            msg += "Debe completar la direccion";
        }
        if (this.telefono == "") {
            ret = false;
            msg += "Debe completar el telefono";
        }
        this.msgError = msg;
        return ret;
    };
    SignupPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    SignupPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    SignupPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/signup/signup.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Crearse una cuenta</ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content>\n  <img src="../../assets/imgs/crearse una cuenta/bg.jpg">\n  <ion-row justify-content-center style="margin-top: 10px;">\n    <button color="facebook" ion-button icon-start>\n      <ion-icon name="logo-facebook"></ion-icon>\n      Iniciar con Facebook\n    </button>\n  </ion-row>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input type="text" [(ngModel)]="nombre"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Apellido</ion-label>\n      <ion-input type="text" [(ngModel)]="apellido"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input type="email" [(ngModel)]="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Password</ion-label>\n      <ion-input type="text" [(ngModel)]="password"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Repetir Password</ion-label>\n      <ion-input type="text" [(ngModel)]="repetirpassword"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Direccion</ion-label>\n      <ion-input type="text" [(ngModel)]="direccion"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Telefono</ion-label>\n      <ion-input type="text" [(ngModel)]="telefono"></ion-input>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Fecha de nacimiento</ion-label>\n      <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="fechanacimiento"></ion-datetime>\n    </ion-item>\n\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Provincia</ion-label>\n          <ion-select interface="action-sheet" (ngModelChange)="onProvinciaChange($event)" [(ngModel)]="provincia">\n            <ion-option *ngFor="let prov of provincias" [value]="prov.provinciaid">{{prov.nombre}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-label>Localidad</ion-label>\n          <ion-select interface="action-sheet" [(ngModel)]="localidad">\n            <ion-option *ngFor="let loc of localidadesProvincia" [value]="loc.localidadid">{{loc.nombre}}</ion-option>\n          </ion-select>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n  </ion-list>\n\n\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="violeta" (click)="signup()">\n    Siguiente\n  </button>\n</ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */], __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 127:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UltimoPasoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_cv_create_cv__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__menu_menu__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UltimoPasoPage = /** @class */ (function () {
    function UltimoPasoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.checkTerminos = false;
    }
    UltimoPasoPage.prototype.selected = function (event) {
        this.checkTerminos = !this.checkTerminos;
    };
    UltimoPasoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UltimoPasoPage');
    };
    UltimoPasoPage.prototype.goToCurriculum = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__create_cv_create_cv__["a" /* CreateCvPage */]);
    };
    UltimoPasoPage.prototype.goToHome = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__menu_menu__["a" /* MenuPage */]);
    };
    UltimoPasoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-ultimo-paso',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/ultimo-paso/ultimo-paso.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Ultimo paso</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n  <ion-row justify-content-center>\n    <img src="../../assets/imgs/ultimoPaso/header.jpg"  style="height: 190px !important;">\n  </ion-row>\n  <ion-row justify-content-center>\n    <ion-col col-9 style="text-align: center;">\n      <p text-wrap>Si estas en búsqueda laboral, puedes completar tu curriculum haciendo click aqui</p>\n    </ion-col>\n  </ion-row>\n  <ion-row justify-content-center>\n    <button color="celeste" ion-button icon-start>\n      <ion-icon style="font-size: 2em;" name="briefcase"></ion-icon>\n      Quiero Trabajar\n    </button>  \n  </ion-row>\n  <ion-row justify-content-center style="margin-top: 20px; border-top: 2px solid lightgray;">\n    <ion-col col-9 style="text-align: center;">\n      <p text-wrap>Si queres empezar a utilizar Ranto acepta los términos y condiciones y te damos la bienvenia</p>\n    </ion-col>\n  </ion-row>\n  <ion-row justify-content-center>\n    <ion-item style="padding-left: 25px !important;" no-lines>\n      <ion-label text-wrap style="font-size: 0.7em;"><strong>Acepto Términos y condiciones de Ranto</strong></ion-label>\n      <ion-checkbox style="margin: 9px !important;" color="secondary" (ionChange)="selected($event)"></ion-checkbox>\n    </ion-item>\n  </ion-row>  \n  <!-- <button style="margin: 0 auto;" ion-button >Acepta terminos y condiciones</button> -->\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="violeta" [disabled]="!checkTerminos" (click)="goToHome()">\n    Empezar\n  </button>\n</ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/ultimo-paso/ultimo-paso.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], UltimoPasoPage);
    return UltimoPasoPage;
}());

//# sourceMappingURL=ultimo-paso.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisComerciosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__perfil_comercio_perfil_comercio__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__create_tienda_create_tienda__ = __webpack_require__(122);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { COMERCIOS } from './../../data/comercios-mok';



var MisComerciosPage = /** @class */ (function () {
    function MisComerciosPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.info = [];
        this.getComercios();
    }
    MisComerciosPage.prototype.getComercios = function () {
        var _this = this;
        this.services.getMisComercios().subscribe(function (x) {
            _this.info = JSON.parse(x["data"]);
        });
    };
    MisComerciosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisComerciosPage');
    };
    MisComerciosPage.prototype.goToCrearTienda = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__create_tienda_create_tienda__["a" /* CreateTiendaPage */]);
    };
    MisComerciosPage.prototype.goTo = function (item) {
        //console.log(item)
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__perfil_comercio_perfil_comercio__["a" /* PerfilComercioPage */], item);
    };
    MisComerciosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-mis-comercios',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-comercios/mis-comercios.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mis Comercios</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list *ngFor="let item of info">\n    <ion-item (click)="goTo(item)">\n      <ion-avatar item-start>\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{item.imgpath}}">\n      </ion-avatar>\n      <h2>{{item.nombre}}</h2>\n      <p>{{item.direccion}}</p>\n    </ion-item>\n  </ion-list>\n  <div no-padding>\n    <button style="height: 50px;" ion-button full (click)="goToCrearTienda()">Crear tienda</button>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-comercios/mis-comercios.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], MisComerciosPage);
    return MisComerciosPage;
}());

//# sourceMappingURL=mis-comercios.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilComercioPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__list_empleos_list_empleos__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__list_prod_list_prod__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__list_vouchers_list_vouchers__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PerfilComercioPage = /** @class */ (function () {
    function PerfilComercioPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.info = this.navParams.data;
    }
    PerfilComercioPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilComercioPage');
        console.log(this.navParams.data);
    };
    PerfilComercioPage.prototype.goToListProd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__list_prod_list_prod__["a" /* ListProdPage */], this.info.tiendaid);
    };
    PerfilComercioPage.prototype.goToListEmpleo = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__list_empleos_list_empleos__["a" /* ListEmpleosPage */], this.info.tiendaid);
    };
    PerfilComercioPage.prototype.goToLisVoucher = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__list_vouchers_list_vouchers__["a" /* ListVouchersPage */], this.info.tiendaid);
    };
    PerfilComercioPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-perfil-comercio',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/perfil-comercio/perfil-comercio.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Mi Tienda</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-row justify-content-center>\n    <ion-col style="text-align: center !important">\n      <h1 text-center>Comercio</h1>\n    </ion-col>\n  </ion-row>\n  <ion-row>\n    <ion-col style="text-align: center !important">\n      <img text-center style="margin: 0 auto;" class="profile-image" src="http://ctrlztest.com.ar/ranto/apirest/{{info.imgpath}}">\n    </ion-col>\n  </ion-row>\n  <h4 text-center>{{info.nombre}}</h4>\n  <p text-center>{{info.direccion}}</p>\n  <button ion-button full color="violeta" (click)="goToListProd()">Mis Productos</button>\n  <button ion-button full color="violeta" (click)="goToListEmpleo()">Mis Empleos</button>\n  <button ion-button full color="violeta" (click)="goToLisVoucher()">Mis Vouchers</button>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/perfil-comercio/perfil-comercio.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */]])
    ], PerfilComercioPage);
    return PerfilComercioPage;
}());

//# sourceMappingURL=perfil-comercio.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListProdPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_prod_create_prod__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__interna_prod_interna_prod__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { PRODUCTOS } from '../../data/listProducts-mok';
var ListProdPage = /** @class */ (function () {
    function ListProdPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.galleryType = 'regular';
        this.list = [];
        //this.grid = Array(Math.ceil(this.images.length/2)); //MATHS!
        this.tiendaid = this.navParams.data;
    }
    ListProdPage.prototype.getProducts = function () {
        var _this = this;
        this.service.getProductosPorTienda(this.tiendaid).subscribe(function (x) {
            _this.list = JSON.parse(x["data"]);
            _this.images = _this.list.map(function (obj) { return obj.image; });
        });
    };
    ListProdPage.prototype.ionViewWillEnter = function () {
        this.getProducts();
    };
    ListProdPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListProdPage');
        console.log(this.images);
        console.log('info', this.info);
    };
    ListProdPage.prototype.ionViewLoaded = function () {
        var rowNum = 0; //counter to iterate over the rows in the grid
        for (var i = 0; i < this.images.length; i += 2) {
            this.grid[rowNum] = Array(2); //declare two elements per row
            if (this.images[i]) {
                this.grid[rowNum][0] = this.images[i]; //insert image
            }
            if (this.images[i + 1]) {
                this.grid[rowNum][1] = this.images[i + 1];
            }
            rowNum++; //go on to the next row
        }
    };
    ListProdPage.prototype.goToCreateProd = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__create_prod_create_prod__["a" /* CreateProdPage */], this.tiendaid);
    };
    ListProdPage.prototype.goToInterna = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__interna_prod_interna_prod__["a" /* InternaProdPage */], product);
    };
    ListProdPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-list-prod',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-prod/list-prod.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Lista Productos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content>\n  <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n    <button ion-button full color="primary" (click)="goToCreateProd()">Crear nuevo Producto</button>\n  </ion-badge>\n  <div padding>\n    <ion-segment [(ngModel)]="galleryType">\n      <ion-segment-button value="regular">\n        Mis Productos\n      </ion-segment-button>\n      <ion-segment-button value="pinterest">\n        Producto\n      </ion-segment-button>\n    </ion-segment>\n    \n    <div [ngSwitch]="galleryType">\n      \n      <ion-grid *ngSwitchCase="\'regular\'">\n        <ion-row>\n          <ion-col col-6 col-md-4 col-xl-3 *ngFor="let product of list">\n            <ion-card class="image-container" (click)="goToInterna(product)">\n              <img src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}"/>\n              <ion-card-content>\n                  <ion-card-title>\n                    {{product.nombre}}\n                  </ion-card-title>                \n                </ion-card-content>\n            </ion-card> \n          </ion-col>\n        </ion-row>\n      </ion-grid>\n  \n      <div class="images" *ngSwitchCase=\'"pinterest"\'>\n        <div class="one-image" *ngFor="let product of list">\n          <ion-card (click)="goToInterna(product)">\n            <img src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}" alt="unit-image">\n            <ion-card-content>\n              <ion-card-title>\n                {{product.nombre}}\n              </ion-card-title>              \n            </ion-card-content>\n                <ion-col>\n                  <button ion-button icon-start clear>\n                    <ion-icon name="logo-usd"></ion-icon>\n                    <div>{{product.precio}}</div>\n                  </button>\n                </ion-col>\n          </ion-card>\n        </div>\n      </div>\n    \n    </div>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-prod/list-prod.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], ListProdPage);
    return ListProdPage;
}());

//# sourceMappingURL=list-prod.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultTrabajoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detalle_puesto_detalle_puesto__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchResultTrabajoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchResultTrabajoPage = /** @class */ (function () {
    function SearchResultTrabajoPage(navCtrl, navParams, serviceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.fromItems = 0;
        this.fromItems = 0;
        serviceProvider.buscarEmpleos(navParams.data, this.fromItems).subscribe(function (x) {
            _this.items = JSON.parse(x["data"]);
        });
    }
    SearchResultTrabajoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchResultTrabajoPage');
    };
    SearchResultTrabajoPage.prototype.goToInterna = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detalle_puesto_detalle_puesto__["a" /* DetallePuestoPage */], item);
    };
    SearchResultTrabajoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-result-trabajo',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search-result-trabajo/search-result-trabajo.html"*/'<ion-header>\n\n    <ion-navbar>\n      <ion-title>search-result</ion-title>\n    </ion-navbar>\n  \n  </ion-header>\n  \n  \n  \n  <ion-content padding>\n    <ion-card *ngFor="let item of items" (click)="goToInterna(item)">\n     <ion-card-content>\n        <ion-card-title>\n          {{item.titulo}} en {{item.tienda}}\n        </ion-card-title>\n        <h2>{{item.lugar}}</h2>\n        <p>${{item.salario}}</p>\n      </ion-card-content>\n    </ion-card>\n  </ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search-result-trabajo/search-result-trabajo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], SearchResultTrabajoPage);
    return SearchResultTrabajoPage;
}());

//# sourceMappingURL=search-result-trabajo.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchResultPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interna_prod_interna_prod__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the SearchResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SearchResultPage = /** @class */ (function () {
    function SearchResultPage(navCtrl, navParams, serviceProvider) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.fromItems = 0;
        this.fromItems = 0;
        serviceProvider.buscarProductos(navParams.data, this.fromItems).subscribe(function (x) {
            _this.items = JSON.parse(x["data"]);
        });
    }
    SearchResultPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchResultPage');
    };
    SearchResultPage.prototype.goToInternaProducto = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__interna_prod_interna_prod__["a" /* InternaProdPage */], item);
    };
    SearchResultPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search-result',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search-result/search-result.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>search-result</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n\n<ion-content padding>\n  <ion-card *ngFor="let item of items" (click)="goToInternaProducto(item)">\n    <img src="http://ctrlztest.com.ar/ranto/apirest/{{item.imagenes}}" />\n    <ion-card-content>\n      <ion-card-title>\n        {{item.nombre}}\n      </ion-card-title>\n      <h2>{{item.precio}}</h2>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search-result/search-result.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], SearchResultPage);
    return SearchResultPage;
}());

//# sourceMappingURL=search-result.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PerfilPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__select_categories_select_categories__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__curriculum_curriculum__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__mis_publicaciones_mis_publicaciones__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__mis_datos_mis_datos__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


//import { FavoritesPage } from './../favorites/favorites';






//import {TabsPageComercios} from '../tabComercios/tabs';
//import { HomePage } from '../home/home';
//import { MisComerciosPage } from '../mis-comercios/mis-comercios';
var PerfilPage = /** @class */ (function () {
    function PerfilPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.pages = [
            { title: 'Home', pageName: __WEBPACK_IMPORTED_MODULE_2__menu_menu__["a" /* MenuPage */] },
            { title: 'Mis datos', pageName: __WEBPACK_IMPORTED_MODULE_6__mis_datos_mis_datos__["a" /* MisDatosPage */] },
            { title: 'Mi Curriculum', pageName: __WEBPACK_IMPORTED_MODULE_1__curriculum_curriculum__["a" /* CurriculumPage */] },
            { title: 'Categorias', pageName: __WEBPACK_IMPORTED_MODULE_0__select_categories_select_categories__["a" /* SelectCategoriesPage */] },
            { title: 'Mis publicaciones', pageName: __WEBPACK_IMPORTED_MODULE_5__mis_publicaciones_mis_publicaciones__["a" /* MisPublicacionesPage */] },
        ];
        this.nombreusuario = service._usuario.nombre + " " + service._usuario.apellido;
    }
    PerfilPage.prototype.openPage = function (page) {
        this.navCtrl.push(page.pageName);
    };
    PerfilPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PerfilPage');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["i" /* Nav */])
    ], PerfilPage.prototype, "nav", void 0);
    PerfilPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-perfil',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/perfil/perfil.html"*/'<ion-header>\n\n  <ion-navbar color="navbar" no-border-bottom>\n\n  </ion-navbar>\n\n\n  <ion-item class="avatar" no-lines>\n    <ion-avatar item-start>\n      <img src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n    </ion-avatar>\n    <h2>\n      {{nombreusuario}}\n    </h2>\n  </ion-item>\n</ion-header>\n\n<ion-content padding>\n  <ion-list class="links-perfil">\n    <button ion-item detail-none block menuClose *ngFor="let p of pages" (click)="openPage(p)">\n      {{ p.title }}\n    </button>\n  </ion-list>\n</ion-content>\n\n<ion-nav main [root]="rootPage"></ion-nav>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/perfil/perfil.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_7__providers_services_services__["a" /* ServicesProvider */]])
    ], PerfilPage);
    return PerfilPage;
}());

//# sourceMappingURL=perfil.js.map

/***/ }),

/***/ 144:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 144;

/***/ }),

/***/ 145:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateCvPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateCvPage = /** @class */ (function () {
    function CreateCvPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.expanded1 = false;
        this.expanded2 = false;
        this.expanded3 = false;
        this.visible1 = false;
        this.visible2 = false;
        this.visible3 = false;
    }
    CreateCvPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateCvPage');
    };
    CreateCvPage.prototype.expandItem = function (x) {
        switch (x) {
            case 1:
                this.expanded1 = !this.expanded1;
                this.visible1 = !this.visible1;
                break;
            case 2:
                this.expanded2 = !this.expanded2;
                this.visible2 = !this.visible2;
                break;
            case 3:
                this.expanded3 = !this.expanded3;
                this.visible3 = !this.visible3;
                break;
        }
    };
    CreateCvPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-cv',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-cv/create-cv.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title>create-cv</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content no-padding>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(1)">\n    Datos Personales\n    <ion-icon [name]="visible1 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-card *ngIf="expanded1">\n    <ion-card-content>\n      <ion-list>\n        <ion-item>\n          <ion-label floating>Nombre y Apellido</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Facha de Nacimeiento</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Domicilio</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>DNI</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Estado Civil</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n        <ion-item>\n          <ion-label floating>Hijos</ion-label>\n          <ion-input type="text"></ion-input>\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(2)">\n    Formación académica\n    <ion-icon [name]="visible2 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(3)">\n    Experiencia laboral\n    <ion-icon [name]="visible3 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="btnPostularse" (click)="goToTerminos()" [disabled]="!completolascats">Finalizar</button>\n</ion-footer>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-cv/create-cv.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], CreateCvPage);
    return CreateCvPage;
}());

//# sourceMappingURL=create-cv.js.map

/***/ }),

/***/ 187:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/categorias/categorias.module": [
		331,
		27
	],
	"../pages/create-prod/create-prod.module": [
		332,
		26
	],
	"../pages/create-tienda/create-tienda.module": [
		333,
		25
	],
	"../pages/curriculum/curriculum.module": [
		334,
		24
	],
	"../pages/detalle-puesto/detalle-puesto.module": [
		335,
		23
	],
	"../pages/eventos-dia/eventos-dia.module": [
		336,
		22
	],
	"../pages/favorites/favorites.module": [
		337,
		21
	],
	"../pages/int-tienda/int-tienda.module": [
		338,
		20
	],
	"../pages/interna-prod-com/interna-prod-com.module": [
		339,
		19
	],
	"../pages/interna-prod/interna-prod.module": [
		340,
		18
	],
	"../pages/list-prod/list-prod.module": [
		341,
		17
	],
	"../pages/list-vouchers/list-vouchers.module": [
		342,
		16
	],
	"../pages/login/login.module": [
		343,
		15
	],
	"../pages/menu/menu.module": [
		344,
		14
	],
	"../pages/mis-comercios/mis-comercios.module": [
		345,
		13
	],
	"../pages/modificar-categorias/modificar-categorias.module": [
		346,
		12
	],
	"../pages/perfil-comercio/perfil-comercio.module": [
		347,
		11
	],
	"../pages/perfil/perfil.module": [
		348,
		10
	],
	"../pages/postulados/postulados.module": [
		349,
		9
	],
	"../pages/search-result-trabajo/search-result-trabajo.module": [
		350,
		8
	],
	"../pages/search-result/search-result.module": [
		351,
		7
	],
	"../pages/search/search.module": [
		352,
		6
	],
	"../pages/select-categories/select-categories.module": [
		353,
		5
	],
	"../pages/signup/signup.module": [
		354,
		4
	],
	"../pages/trabajo/trabajo.module": [
		355,
		3
	],
	"../pages/ultimo-paso/ultimo-paso.module": [
		356,
		2
	],
	"../pages/ver-curriculum/ver-curriculum.module": [
		357,
		1
	],
	"../pages/voucher/voucher.module": [
		358,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 187;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 192:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListEmpleosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__create_empleo_create_empleo__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_puesto_com_detail_puesto_com__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { TRABAJOS } from '../../data/trabajos-mok';
var ListEmpleosPage = /** @class */ (function () {
    function ListEmpleosPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.empleos = [];
        this.tiendaid = navParams.data;
        this.getTrabajos();
    }
    ListEmpleosPage.prototype.getTrabajos = function () {
        var _this = this;
        this.service.getPuestosPorTienda(this.tiendaid).subscribe(function (x) {
            _this.empleos = JSON.parse(x["data"]);
        });
    };
    ListEmpleosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListEmpleosPage');
    };
    ListEmpleosPage.prototype.detallePuesto = function (puesto) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detail_puesto_com_detail_puesto_com__["a" /* DetailPuestoComPage */], puesto);
    };
    ListEmpleosPage.prototype.goToCreate = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__create_empleo_create_empleo__["a" /* CreateEmpleoPage */], this.tiendaid);
    };
    ListEmpleosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_3__angular_core__["m" /* Component */])({
            selector: 'page-list-empleos',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-empleos/list-empleos.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Mis Empleos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n    <button ion-button full color="primary" (click)="goToCreate()">Crear nuevo Empleo</button>\n  </ion-badge>\n  <ion-card>\n    <ion-card-header>\n      Mis Empleos Publicados\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list *ngFor="let puesto of empleos">\n        <ion-item text-wrap (click)="detallePuesto(puesto)">\n          <ion-icon name="briefcase" item-start></ion-icon>\n          {{puesto.titulo}}\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-empleos/list-empleos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], ListEmpleosPage);
    return ListEmpleosPage;
}());

//# sourceMappingURL=list-empleos.js.map

/***/ }),

/***/ 193:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateEmpleoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreateEmpleoPage = /** @class */ (function () {
    function CreateEmpleoPage(toastCtrl, navCtrl, navParams, alertCtrl, service) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.listaAreas = [];
        this.listaCargahoraria = [];
        this.showMsgError = false;
        this.msgError = "";
        this.tiendaid = navParams.data;
        service.getAreayYCargahoraria().subscribe(function (x) {
            console.log(JSON.parse(x["data"]));
            _this.listaAreas = JSON.parse(x["data"])["areas"];
            _this.listaCargahoraria = JSON.parse(x["data"])["cargahorarias"];
        });
    }
    CreateEmpleoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateEmpleoPage');
    };
    CreateEmpleoPage.prototype.createEmpleo = function () {
        var _this = this;
        if (this.validacion()) {
            this.service.crearPuestoTrabajo(this.tiendaid, this.titulo, this.direccion, this.cargahoraria, this.area, this.salario, this.horario, this.detalle).subscribe(function (x) {
                _this.toastExito();
            });
        }
        else {
            //mssgerror		
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateEmpleoPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.titulo == "") {
            ret = false;
            msg += "Debe completar el titulo";
        }
        if (this.direccion == "") {
            ret = false;
            msg += "Debe completar la direccion";
        }
        if (this.cargahoraria == 0) {
            ret = false;
            msg += "Debe seleccionar una carga horaria";
        }
        if (this.area == 0) {
            ret = false;
            msg += "Debe seleccionar un area";
        }
        if (this.salario == "") {
            ret = false;
            msg += "Debe completar el salario";
        }
        if (this.horario == "") {
            ret = false;
            msg += "Debe completar el horario";
        }
        if (this.detalle == "") {
            ret = false;
            msg += "Debe completar el detalle";
        }
        this.msgError = msg;
        return ret;
    };
    CreateEmpleoPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateEmpleoPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateEmpleoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-empleo',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-empleo/create-empleo.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Nuevo Empleo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-content padding>\n    <ion-list>\n\n      <ion-item>\n        <ion-label floating>Titulo</ion-label>\n        <ion-input type="text" [(ngModel)]="titulo" clearInput></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Area</ion-label>\n        <ion-select interface="action-sheet" [(ngModel)]="area">\n          <ion-option *ngFor="let area of listaAreas" [value]="area.areaid">{{area.nombre}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Carga Horaria</ion-label>\n        <ion-select interface="action-sheet" [(ngModel)]="cargahoraria">\n          <ion-option *ngFor="let carga of listaCargahoraria" [value]="carga.cargahorariaid">{{carga.nombre}}</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Descripcion</ion-label>\n        <ion-textarea type="text" [(ngModel)]="detalle"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Salario</ion-label>\n        <ion-input type="text" clearInput [(ngModel)]="salario"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Horario</ion-label>\n        <ion-input type="text" [(ngModel)]="horario"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Dirección</ion-label>\n        <ion-input type="text" [(ngModel)]="direccion"></ion-input>\n      </ion-item>\n    </ion-list>\n\n    <div padding>\n      <button ion-button block (click)="createEmpleo()">Crear</button>\n    </div>\n  </ion-content>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-empleo/create-empleo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], CreateEmpleoPage);
    return CreateEmpleoPage;
}());

//# sourceMappingURL=create-empleo.js.map

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailPuestoComPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__postulados_postulados__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailPuestoComPage = /** @class */ (function () {
    function DetailPuestoComPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detalle_puesto = [];
        this.detalle_puesto = this.navParams.data;
    }
    DetailPuestoComPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailPuestoComPage');
    };
    DetailPuestoComPage.prototype.postulados = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__postulados_postulados__["a" /* PostuladosPage */], this.detalle_puesto.puestoid);
    };
    DetailPuestoComPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-detail-puesto-com',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detail-puesto-com/detail-puesto-com.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Interna Empleo</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-card>\n    <ion-item>\n      <ion-icon name="pin" item-start large></ion-icon>\n      <h2 text-wrap>{{detalle_puesto.titulo}}</h2>\n      <p text-wrap>{{detalle_puesto.lugar}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="list-box" item-start large></ion-icon>\n      <h2>Area</h2>\n      <p text-wrap>{{detalle_puesto.area}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="list-box" item-start large></ion-icon>\n      <h2>Carga horaria</h2>\n      <p text-wrap>{{detalle_puesto.cargahoraria}}</p>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-icon name="list-box" item-start large></ion-icon>\n      <h2>Salario</h2>\n      <p text-wrap>{{detalle_puesto.salario}}</p>\n    </ion-item>\n\n    <ion-item>\n      <ion-icon name="list-box" item-start large></ion-icon>\n      <h2>Horario</h2>\n      <p text-wrap>{{detalle_puesto.horario}}</p>\n    </ion-item>\n\n    <ion-item class="detalle">\n      <ion-icon name="list-box" item-start large></ion-icon>\n      <h2>Detalle</h2>\n      <p>{{detalle_puesto.detalle}}</p>\n    </ion-item>\n\n    <ion-item>\n      <button ion-button full (click)="postulados()">Ver Postulados</button>\n    </ion-item>\n\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detail-puesto-com/detail-puesto-com.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], DetailPuestoComPage);
    return DetailPuestoComPage;
}());

//# sourceMappingURL=detail-puesto-com.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_create_prod_user_create_prod_user__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_trabajo_trabajo__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_search_search__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_home_home__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_voucher_voucher__ = __webpack_require__(66);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var TabsPage = /** @class */ (function () {
    function TabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__pages_home_home__["a" /* HomePage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_6__pages_voucher_voucher__["a" /* VoucherPage */];
        this.tab5Root = __WEBPACK_IMPORTED_MODULE_0__pages_create_prod_user_create_prod_user__["a" /* CreateProdUserPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__pages_search_search__["a" /* SearchPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_1__pages_trabajo_trabajo__["a" /* TrabajoPage */];
        this.myIndex = navParams.data.tabIndex || 0;
        //this.countCarItem = this.storage.get('products-add') ? this.storage.get('products-add').then((val)=> this.badge = val) : this.badge = 0;
        //this.countCarItem();
    }
    TabsPage.prototype.martin = function () {
        this.navCtrl.popToRoot();
    };
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_5__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/tabs/tabs.html"*/'<ion-tabs color="colorTabs" [selectedIndex]="myIndex">\n  <ion-tab [root]="tab1Root" tabTitle="Home" tabIcon="home"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Vouchers" tabIcon="filing"></ion-tab>\n  <ion-tab [root]="tab5Root" tabIcon="ranto-ranto"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Buscar" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Clasificado" tabIcon="paper"></ion-tab>  \n</ion-tabs>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/tabs/tabs.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* NavParams */]])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 196:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProdUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateProdUserPage = /** @class */ (function () {
    function CreateProdUserPage(navCtrl, navParams, services, camera, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.camera = camera;
        this.toastCtrl = toastCtrl;
        this.categorias = [];
        this.imageBox = [];
        this.showMsgError = false;
        this.msgError = "";
        services.getCategories().subscribe(function (x) {
            _this.categorias = JSON.parse(x["data"]);
        });
    }
    CreateProdUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateProdUserPage');
    };
    CreateProdUserPage.prototype.guardarProd = function () {
        var _this = this;
        if (this.validacion()) {
            this.services.crearProductoUsuario(this.nombreProd, this.detalleProd, this.precioProd, this.categoria, this.imageBox).subscribe(function (x) {
                _this.toastExito();
            });
        }
        else {
            //msgerror		
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateProdUserPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.nombreProd == "") {
            ret = false;
            msg += "Debe completar el nombre";
        }
        if (this.detalleProd == "") {
            ret = false;
            msg += "Debe completar el detalle";
        }
        if (this.imageBox.length == 0) {
            ret = false;
            msg += "Debe agregar al menos una imagen";
        }
        if (this.precioProd == 0) {
            ret = false;
            msg += "Debe completar el precio";
        }
        if (this.categoria == 0) {
            ret = false;
            msg += "Debe seleccionar una categoria";
        }
        this.msgError = msg;
        return ret;
    };
    CreateProdUserPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateProdUserPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateProdUserPage.prototype.abrirGaleria = function () {
        var _this = this;
        var options = {
            quality: 30,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
        };
        this.camera.getPicture(options).then(function (imageData) {
            _this.base64Image = 'data:image/jpeg;base64,' + imageData;
            _this.imageBox.push(_this.base64Image);
            console.log('ArrayImage', _this.imageBox);
        }, function (err) {
            console.log('err en getPicture', err);
        });
    };
    CreateProdUserPage.prototype.eliminarImg = function (index) {
        this.imageBox.splice(index, 1);
    };
    CreateProdUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-create-prod-user',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-prod-user/create-prod-user.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Crear Producto</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-list>\n\n    <ion-item>\n      <ion-label floating>Nombre</ion-label>\n      <ion-input type="text" [(ngModel)]="nombreProd" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Detalle</ion-label>\n      <ion-textarea type="text" [(ngModel)]="detalleProd" clearInput></ion-textarea>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Precio</ion-label>\n      <ion-input type="number" [(ngModel)]="precioProd" clearInput></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Categoria</ion-label>\n      <ion-select okText="Ok" cancelText="Cancelar" [(ngModel)]="categoria">\n        <ion-option *ngFor="let cat of categorias" [value]="cat.categoriaid">{{cat.nombre}}</ion-option>\n      </ion-select>\n    </ion-item>\n \n    <ion-item>\n      <button ion-button (click)="abrirGaleria()">Seleccionar imagenes</button>\n    </ion-item>\n\n    <ion-item *ngIf="imageBox.length > 0">\n      <ion-card *ngFor="let img of imageBox; let i = index">\n\n        <img src="{{img}}" />\n\n        <ion-card-content>\n\n        </ion-card-content>\n\n        <ion-row no-padding>\n\n          <ion-col text-right>\n            <button ion-button clear small color="danger" (click)="eliminarImg(i)" icon-start>\n              <ion-icon name=\'share-alt\'></ion-icon>\n              Borrar\n            </button>\n          </ion-col>\n        </ion-row>\n\n      </ion-card>\n\n\n\n    </ion-item>\n  </ion-list>\n\n  <div padding>\n    <button ion-button block (click)="guardarProd()">Guardar</button>\n  </div>\n\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-prod-user/create-prod-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_camera__["a" /* Camera */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */]])
    ], CreateProdUserPage);
    return CreateProdUserPage;
}());

//# sourceMappingURL=create-prod-user.js.map

/***/ }),

/***/ 197:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateClasificadoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CreateClasificadoPage = /** @class */ (function () {
    function CreateClasificadoPage(toastCtrl, navCtrl, navParams, alertCtrl, services) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.services = services;
        this.showMsgError = false;
        this.msgError = "";
        this.titulo = "";
        this.detalle = "";
    }
    CreateClasificadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateClasificadoPage');
    };
    CreateClasificadoPage.prototype.guardarClas = function () {
        var _this = this;
        if (this.validacion()) {
            this.services.crearClasificado(this.titulo, this.detalle).subscribe(function (x) {
                console.log('crea', x['status']);
                if (x['status'] === 200) {
                    _this.toastExito();
                    _this.navCtrl.pop();
                }
            });
        }
        else {
            //msgerror	
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateClasificadoPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.titulo == "") {
            ret = false;
            msg += "Debe completar el titulo";
        }
        if (this.detalle == "") {
            ret = false;
            msg += "Debe completar el detalle";
        }
        this.msgError = msg;
        return ret;
    };
    CreateClasificadoPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateClasificadoPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateClasificadoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-create-clasificado',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-clasificado/create-clasificado.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Crear Clasificado</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content padding>\n\n\n  <ion-card>\n    <ion-list>\n      <ion-item>\n        <ion-label floating>Titulo</ion-label>\n        <ion-input type="text" clearInput [(ngModel)]="titulo"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label floating>Detalle</ion-label>\n        <ion-textarea type="text" [(ngModel)]="detalle"></ion-textarea>\n      </ion-item>\n    </ion-list>\n  </ion-card>\n\n\n\n\n  <div padding>\n    <button class="guardar" ion-button block (click)="guardarClas()">Guardar</button>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-clasificado/create-clasificado.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], CreateClasificadoPage);
    return CreateClasificadoPage;
}());

//# sourceMappingURL=create-clasificado.js.map

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetailClasificadoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__user_clasificado_user_clasificado__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DetailClasificadoPage = /** @class */ (function () {
    function DetailClasificadoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.detalle_puesto = [];
        this.detalle_puesto = this.navParams.data;
    }
    DetailClasificadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetailClasificadoPage');
    };
    DetailClasificadoPage.prototype.verClasificado = function (userid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__user_clasificado_user_clasificado__["a" /* UserClasificadoPage */], userid);
    };
    DetailClasificadoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-detail-clasificado',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detail-clasificado/detail-clasificado.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title>Clasificado</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-badge color="celeste" style="margin-top: 15px; width: 100%;height: 45px; border-radius: 0px !important;">\n    <p style="margin: 10px 0 !important;font-size: 1.3em;"><strong>{{detalle_puesto.titulo}}</strong></p>\n  </ion-badge>\n  <ion-card>\n      <ion-card-header>\n        <p style="padding-bottom: 10px !important; color: #999999; border-bottom: 2px solid lightgray;"><strong>{{detalle_puesto.titulo}}</strong></p>\n      </ion-card-header>\n      <ion-card-content>\n        <p text-wrap>{{detalle_puesto.detalle}}</p>\n      </ion-card-content>   \n    </ion-card>\n</ion-content>\n<ion-footer>\n    <button style="margin: 0px !important; height: 50px;" ion-button full color="btnPostularse" (click)="verClasificado(detalle_puesto.usuarioid)">\n      <strong>Ver</strong> \n    </button>\n  </ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detail-clasificado/detail-clasificado.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], DetailClasificadoPage);
    return DetailClasificadoPage;
}());

//# sourceMappingURL=detail-clasificado.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntEventoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var IntEventoPage = /** @class */ (function () {
    function IntEventoPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.galleryType = 'regular';
        this.data_evento = this.navParams.data;
        console.log('event', this.data_evento);
    }
    IntEventoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntEventoPage');
    };
    IntEventoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-int-evento',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-evento/int-evento.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title>Evento</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <div>\n        <ion-segment [(ngModel)]="galleryType" color="violeta">\n          <ion-segment-button value="regular">\n            Evento\n          </ion-segment-button>\n          <ion-segment-button value="pinterest">\n            Mas Eventos\n          </ion-segment-button>\n        </ion-segment>\n        \n        <div [ngSwitch]="galleryType">\n          \n          <ion-grid *ngSwitchCase="\'regular\'">\n            <ion-row justify-content-center>\n              <img style="width: 60%; height: 60%;" src="{{data_evento.imgpath}}"/>\n            </ion-row>\n            <ion-row justify-content-center>\n              <ion-col>\n                <h4 text-center>{{data_evento.titulo}}</h4>\n              </ion-col>\n            </ion-row>\n            <ion-row justify-content-center>\n              <ion-col>\n                <p text-center text-wrap>{{data_evento.detalle}}</p>\n              </ion-col>\n            </ion-row>\n          </ion-grid>\n      \n          <div class="images" *ngSwitchCase=\'"pinterest"\'>\n            <div class="one-image" *ngFor="let product of list">\n              <ion-card (click)="goToInterna(product)">\n                <img src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}" alt="unit-image">\n                <ion-card-content>\n                  <ion-card-title>\n                    {{product.nombre}}\n                  </ion-card-title>              \n                </ion-card-content>\n                    <ion-col>\n                      <button ion-button icon-start clear>\n                        <ion-icon name="logo-usd"></ion-icon>\n                        <div>{{product.precio}}</div>\n                      </button>\n                    </ion-col>\n              </ion-card>\n            </div>\n          </div>\n    </div>\n  </div>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-evento/int-evento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], IntEventoPage);
    return IntEventoPage;
}());

//# sourceMappingURL=int-evento.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AllCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__categorias_categorias__ = __webpack_require__(59);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

//import { OTHER } from './../../data/categories-mok';
//import { PRODUCTOS } from './../../data/listProducts-mok';



//import { InternaProdPage } from '../interna-prod/interna-prod';
var AllCategoriesPage = /** @class */ (function () {
    function AllCategoriesPage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        //caca:string="#e4e4e4";
        this.categories = [];
        this.all = [];
        this.service.getCategories().subscribe(function (data) {
            _this.all = JSON.parse(data['data']);
            _this.count = 1;
            _this.all.map(function (x) {
                if (_this.count == 1 || _this.count == 4 || _this.count == 7 || _this.count == 10 || _this.count == 13 || _this.count == 16) {
                    x.className = "5px solid #58dbd2";
                }
                else if (_this.count == 2 || _this.count == 5 || _this.count == 8 || _this.count == 11 || _this.count == 14 || _this.count == 17) {
                    x.className = "5px solid #FEAC52";
                }
                else {
                    x.className = "5px solid #918BF9";
                }
                _this.count++;
            });
        });
    }
    AllCategoriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AllCategoriesPage');
    };
    AllCategoriesPage.prototype.goToIntProd = function (catid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__categorias_categorias__["a" /* CategoriasPage */], catid);
    };
    AllCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-all-categories',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/all-categories/all-categories.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title>Categorias</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content no-padding>\n  <ion-list>\n    <ion-item style="height: 80px; border-bottom: 1px solid lightgray;" *ngFor="let cat of all" [ngStyle]="{\'border-left\': cat.className}"\n      (click)="goToIntProd(cat)">\n      <ion-row>\n        <ion-col col-8 class="colnombre">\n          <h3 text-wrap><strong>{{cat.nombre}}</strong></h3>\n        </ion-col>\n        <ion-col col-4>\n          <button ion-button outline color="violeta" class="buttonvioleta" (click)="goToIntProd(cat.categoriaid)">\n            VER\n          </button>\n        </ion-col>\n      </ion-row>\n    </ion-item>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/all-categories/all-categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], AllCategoriesPage);
    return AllCategoriesPage;
}());

//# sourceMappingURL=all-categories.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisPublicacionesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__int_prod_user_int_prod_user__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { InternaProdPage } from '../interna-prod/interna-prod';
var MisPublicacionesPage = /** @class */ (function () {
    function MisPublicacionesPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.icons = 'camera';
        this.getProdsUser();
    }
    MisPublicacionesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisPublicacionesPage');
    };
    MisPublicacionesPage.prototype.goToInterna = function (prod) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__int_prod_user_int_prod_user__["a" /* IntProdUserPage */], prod);
    };
    MisPublicacionesPage.prototype.getProdsUser = function () {
        var _this = this;
        this.services.getProductosPorUsuario().subscribe(function (x) {
            var prods = JSON.parse(x["data"]);
            console.log("prods", prods);
            prods.map(function (m) {
                var fechavenc = new Date();
                var fechapu = new Date(m.fechapublicacion);
                fechavenc.setDate(fechapu.getDate() + 15);
                m.fechav = fechavenc;
            });
            console.log("prods 2", prods);
            _this.publicacionesactivo = prods.filter(function (f) { return f.fechav.getDate() >= Date.now(); });
            _this.publicacionesfinalizadas = prods.filter(function (f) { return f.fechav.getDate() < Date.now(); });
            console.log("prods activos", _this.publicacionesactivo);
            console.log("prods vencidos", _this.publicacionesfinalizadas);
        });
    };
    MisPublicacionesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-mis-publicaciones',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-publicaciones/mis-publicaciones.html"*/'<ion-header>\n  <ion-navbar>\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Mis Publicaciones</ion-title>\n  </ion-navbar>\n  <div padding>\n    <ion-segment [(ngModel)]="icons" color="violeta">\n      <ion-segment-button value="camera">\n          Activas\n      </ion-segment-button>\n      <ion-segment-button value="bookmark">\n        Finalizadas\n      </ion-segment-button> \n    </ion-segment>\n  </div>\n</ion-header>\n\n<ion-content padding>\n  <div [ngSwitch]="icons">\n    <ion-list *ngSwitchCase="\'camera\'">\n    <ion-item *ngFor="let prdact of publicacionesactivo" (click)="goToInterna(prdact)">\n      <ion-thumbnail item-start>\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{prdcat.imagenes[0]}}">\n      </ion-thumbnail>\n      <h3>{{prdact.nombre}}</h3>\n      <p text-wrap>{{prdact.fechapublicacion}}</p>\n    </ion-item>\n  </ion-list>\n\n  <ion-list *ngSwitchCase="\'bookmark\'">\n      <ion-item *ngFor="let prdfin of publicacionesfinalizadas" (click)="goToInterna(prdfin)">\n        <ion-thumbnail item-start>\n          <img src="http://ctrlztest.com.ar/ranto/apirest/{{prdfin.imagenes[0]}}">\n        </ion-thumbnail>\n        <h3>{{prdfin.nombre}}</h3>\n        <p text-wrap>{{prdfin.fechapublicacion}}</p>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-publicaciones/mis-publicaciones.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */]])
    ], MisPublicacionesPage);
    return MisPublicacionesPage;
}());

//# sourceMappingURL=mis-publicaciones.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntProdUserPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntProdUserPage = /** @class */ (function () {
    function IntProdUserPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.data_prod = this.navParams.data;
    }
    IntProdUserPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntProdUserPage');
    };
    IntProdUserPage.prototype.favorito = function (productoid) {
        (this.isChecked) ? this.removeFavorito(productoid) : this.addFavorito(productoid);
    };
    IntProdUserPage.prototype.addFavorito = function (productid) {
        var _this = this;
        this.services.setGuardarProdFav(productid).subscribe(function (x) {
            console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = true : _this.isChecked;
        });
    };
    IntProdUserPage.prototype.removeFavorito = function (productid) {
        var _this = this;
        this.services.borrarFavorito(productid).subscribe(function (x) {
            //console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = false : _this.isChecked;
        });
    };
    IntProdUserPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-int-prod-user',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-prod-user/int-prod-user.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Interna Producto</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="logoutme()">\n        <ion-icon name=\'\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-slides>\n      <ion-slide *ngFor="let img of data_prod.imagenes">\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{img}}" alt="imagen producto">\n      </ion-slide>\n    </ion-slides>\n  </ion-item>\n  <ion-item>\n    <ion-row>\n      <ion-col>\n        <h1>{{data_prod.nombre}}</h1>\n        <p>${{data_prod.precio}}</p>\n      </ion-col>\n      <ion-col>\n        <!-- <ion-icon name="heart-empty" color="violeta"></ion-icon> -->\n        <ion-icon style="font-size: 1.4em; margin: 5px;" float-right [color]="isChecked ? \'danger\' : \'dark\'" name="heart" (click)="favorito(data_prod.productoid)"></ion-icon>\n      </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item>\n    <ion-row>\n      <ion-col>\n        Publicado:\n      </ion-col>\n      <ion-col float-right>\n        {{data_prod.fechapublicacion}}\n      </ion-col>\n    </ion-row>\n   <!--  <ion-icon name="desktop"></ion-icon>\n    {{data_prod.tienda}}\n    <span (click)="goToIntTienda(data_prod.tiendaid)">\n      <a style="font-size: 0.7em;">Ver perfil tienda</a>\n    </span> -->\n  </ion-item>\n  <ion-card>\n    <ion-card-header>\n      <ion-icon name="list-box"></ion-icon>\n      Descripción\n    </ion-card-header>\n    <ion-card-content>\n      <p>{{data_prod.detalle}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-prod-user/int-prod-user.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], IntProdUserPage);
    return IntProdUserPage;
}());

//# sourceMappingURL=int-prod-user.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MisDatosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the MisDatosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MisDatosPage = /** @class */ (function () {
    function MisDatosPage(toastCtrl, navCtrl, navParams, service) {
        var _this = this;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.datos = [];
        this.provincias = [];
        this.localidades = [];
        this.localidadesProvincia = [];
        service.getMisDatos().subscribe(function (x) {
            console.log("persona", JSON.parse(x["data"])[0]);
            _this.datos = JSON.parse(x["data"])[0];
        });
        service.getProvinciasYLocalidades().subscribe(function (z) {
            //console.log("prov y loc:",JSON.parse(z["data"]));
            _this.provincias = JSON.parse(z["data"]).provincias;
            _this.localidades = JSON.parse(z["data"]).localidades;
        });
    }
    MisDatosPage.prototype.onProvinciaChange = function ($event) {
        console.log("evento", $event);
        this.localidadesProvincia = this.localidades.filter(function (f) { return f.provinciaid == $event; });
    };
    MisDatosPage.prototype.guardarDatos = function () {
        this.toastExito();
        this.navCtrl.pop();
    };
    MisDatosPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    MisDatosPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: "",
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    MisDatosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MisDatosPage');
    };
    MisDatosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-mis-datos',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-datos/mis-datos.html"*/'<!--\n  Generated template for the MisDatosPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>{{datos.nombre}} {{datos.apellido}}</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content>\n  <img src="../../assets/imgs/crearse una cuenta/bg.jpg">\n\n  <ion-list class="datos">\n\n    <ion-item class="nombre">\n      <ion-label floating>Nombre</ion-label>\n      <ion-input [(ngModel)]="datos.nombre" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Apellido</ion-label>\n      <ion-input [(ngModel)]="datos.apellido" type="text"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Email</ion-label>\n      <ion-input [(ngModel)]="datos.email" type="email"></ion-input>\n    </ion-item>\n\n    <ion-item>\n      <ion-label floating>Fecha de nacimiento</ion-label>\n      <ion-datetime [(ngModel)]="datos.fechanacimiento" displayFormat="DD/MM/YYYY"></ion-datetime>\n    </ion-item>\n\n\n    <ion-item>\n      <ion-label>Provincia</ion-label>\n      <ion-select interface="action-sheet" (ngModelChange)="onProvinciaChange($event)" [(ngModel)]="provincia">\n        <ion-option *ngFor="let prov of provincias" [value]="prov.provinciaid">{{prov.nombre}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n    <ion-item>\n      <ion-label>Localidad</ion-label>\n      <ion-select interface="action-sheet" [(ngModel)]="localidad">\n        <ion-option *ngFor="let loc of localidadesProvincia" [value]="loc.localidadid">{{loc.nombre}}</ion-option>\n      </ion-select>\n    </ion-item>\n\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="celeste" (click)="guardarDatos()">\n    <ion-icon name="checkmark" color="light"></ion-icon>\n  </button>\n</ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/mis-datos/mis-datos.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], MisDatosPage);
    return MisDatosPage;
}());

//# sourceMappingURL=mis-datos.js.map

/***/ }),

/***/ 245:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventosDiaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EventosDiaPage = /** @class */ (function () {
    function EventosDiaPage(navCtrl, navParams, viewCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
    }
    EventosDiaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EventosDiaPage');
    };
    EventosDiaPage.prototype.dismiss = function () {
        this.viewCtrl.dismiss();
    };
    EventosDiaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-eventos-dia',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/eventos-dia/eventos-dia.html"*/'<ion-header>\n  <ion-toolbar>\n    <ion-title>\n      Eventos del dia\n    </ion-title>\n    <ion-buttons start>\n      <button ion-button (click)="dismiss()">\n        <span ion-text color="primary" showWhen="ios">Cancel</span>\n        <ion-icon name="md-close" showWhen="android,windows"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-card>\n    <img src="https://st-listas.20minutos.es/images/2008-05/16034/215565_640px.jpg?1518514868"/>\n    <ion-card-content>\n      <ion-card-title>\n        Nine Inch Nails Live\n        </ion-card-title>\n      <p>\n        The most popular industrial group ever, and largely\n        responsible for bringing the music to a mass audience.\n      </p>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <img src="https://www.baressp.com.br/eventos/fotos2/banda_rockcom-min.jpg"/>\n    <ion-card-content>\n      <ion-card-title>\n        Nine Inch Nails Live\n        </ion-card-title>\n      <p>\n        The most popular industrial group ever, and largely\n        responsible for bringing the music to a mass audience.\n      </p>\n    </ion-card-content>\n  </ion-card>\n  <ion-card>\n    <img src="https://pm1.narvii.com/6436/5bee9bf3de5de492f9b9a0e193b3cb1ead779f51_hq.jpg"/>\n    <ion-card-content>\n      <ion-card-title>\n        Nine Inch Nails Live\n        </ion-card-title>\n      <p>\n        The most popular industrial group ever, and largely\n        responsible for bringing the music to a mass audience.\n      </p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/eventos-dia/eventos-dia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["n" /* ViewController */]])
    ], EventosDiaPage);
    return EventosDiaPage;
}());

//# sourceMappingURL=eventos-dia.js.map

/***/ }),

/***/ 246:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternaProdComPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_clasificado_user_clasificado__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__int_tienda_int_tienda__ = __webpack_require__(45);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var InternaProdComPage = /** @class */ (function () {
    function InternaProdComPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.data_prod = this.navParams.data;
        console.log(this.navParams.data);
    }
    InternaProdComPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InternaProdComPage');
        console.log('aqui', this.data_prod);
    };
    InternaProdComPage.prototype.favorito = function (productoid) {
        (this.isChecked) ? this.removeFavorito(productoid) : this.addFavorito(productoid);
    };
    InternaProdComPage.prototype.addFavorito = function (productid) {
        var _this = this;
        this.services.setGuardarProdFav(productid).subscribe(function (x) {
            console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = true : _this.isChecked;
        });
    };
    InternaProdComPage.prototype.removeFavorito = function (productid) {
        var _this = this;
        this.services.borrarFavorito(productid).subscribe(function (x) {
            //console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = false : _this.isChecked;
        });
    };
    InternaProdComPage.prototype.goToIntTienda = function () {
        var _this = this;
        if (this.data_prod.tiendaid == null) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__user_clasificado_user_clasificado__["a" /* UserClasificadoPage */], this.data_prod.usuarioid);
        }
        else {
            this.services.getTiendaPorId(this.data_prod.tiendaid).subscribe(function (x) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__int_tienda_int_tienda__["a" /* IntTiendaPage */], JSON.parse(x["data"]));
            });
        }
    };
    InternaProdComPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-interna-prod-com',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/interna-prod-com/interna-prod-com.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Interna Producto</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="logoutme()">\n        <ion-icon name=\'\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-item>\n        <ion-slides>\n          <ion-slide *ngFor="let img of data_prod.imagenes">\n            <img src="http://ctrlztest.com.ar/ranto/apirest/{{img}}" alt="imagen producto">\n          </ion-slide>\n        </ion-slides>\n      </ion-item>\n      <ion-item>\n        <ion-row>\n          <ion-col>\n            <h1>{{data_prod.nombre}}</h1>\n            <p>${{data_prod.precio}}</p>\n          </ion-col>\n          <ion-col>\n            <!-- <ion-icon name="heart-empty" color="violeta"></ion-icon> -->\n            <ion-icon style="font-size: 1.4em; margin: 5px;" float-right [color]="isChecked ? \'danger\' : \'dark\'" name="heart" (click)="favorito(data_prod.productoid)"></ion-icon>\n          </ion-col>\n        </ion-row>\n      </ion-item>\n      <ion-item>\n        <!-- <ion-row>\n          <ion-col>\n            Publicado:\n          </ion-col>\n          <ion-col float-right>\n            {{data_prod.fechapublicacion}}\n          </ion-col>\n        </ion-row> -->\n        <ion-icon name="desktop"></ion-icon>\n        {{data_prod.tienda}}\n        <span (click)="goToIntTienda(data_prod.tiendaid)">\n          <a style="font-size: 0.7em;">Ver perfil tienda</a>\n        </span>\n      </ion-item>\n      <ion-card>\n        <ion-card-header>\n          <ion-icon name="list-box"></ion-icon>\n          Descripción\n        </ion-card-header>\n        <ion-card-content>\n          <p>{{data_prod.detalle}}</p>\n        </ion-card-content>\n      </ion-card>\n  <!-- <ion-item>\n    <ion-slides>\n      <ion-slide *ngFor="let img of data_prod.imagenes">\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{img}}" alt="imagen producto">\n      </ion-slide>\n    </ion-slides>\n  </ion-item>\n  <ion-item>\n    <h1>{{data_prod.nombre}}</h1>\n    <p>${{data_prod.precio}}</p>\n  </ion-item>\n  <ion-card>\n    <ion-card-header>\n      <ion-icon name="list-box"></ion-icon>\n      Descripción      \n    </ion-card-header>\n    <ion-card-content>\n      <p>{{data_prod.detalle}}</p>\n    </ion-card-content>\n  </ion-card> -->\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/interna-prod-com/interna-prod-com.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], InternaProdComPage);
    return InternaProdComPage;
}());

//# sourceMappingURL=interna-prod-com.js.map

/***/ }),

/***/ 247:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModificarCategoriasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ModificarCategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ModificarCategoriasPage = /** @class */ (function () {
    function ModificarCategoriasPage(navCtrl, navParams, service) {
        //console.log(this.service.categorias.length);
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.categories = [];
        this.driver = {};
        this.isCheckboxDisabled = false;
        this.checkedDrivers = [];
        this.completolascats = false;
        /*  checked(driver) {
           console.log('check', driver.checked);
           if (driver.checked === true) {
             this.checkedDrivers.push(driver);
           } else if (driver.checked === false) {
             this.checkedDrivers.splice(this.checkedDrivers.indexOf(driver), 1);
           }
       
           //check for two selected.
           if (this.categories.filter(driver => driver.checked).length === 2) {
             this.isCheckboxDisabled = true;
           }
         }  */
        this.categoriesSelected = [];
        this.service.getCategories().subscribe(function (x) {
            _this.categories = JSON.parse(x['data']);
            _this.service.getMisCategorias().subscribe(function (x) {
                var miscats = JSON.parse(x['data']);
                _this.categories.map(function (c) {
                    c.ischecked = (miscats.filter(function (f) { return f.categoriaid == c.categoriaid; }).length > 0);
                    console.log("cat: ", c.categoriaid, c.ischecked);
                });
                console.log("sekeccuibadadas", _this.categoriesSelected);
            });
        });
    }
    ModificarCategoriasPage.prototype.selected = function ($event, catid) {
        //console.log('event', $event,catid)
        if ($event._value) {
            if (this.categoriesSelected.length < 3) {
                this.categoriesSelected.push(catid);
            }
            else {
                this.categoriesSelected.push(catid);
                alert("Listo! Ya elegiste las 4 categorias necesarias. Si queres cambiarlas tendras que deseleccionar alguna categoria.");
                //deshabilitar todo el resto
                this.completolascats = true;
            }
        }
        else {
            var index = this.categoriesSelected.indexOf(catid);
            this.categoriesSelected.splice(index, 1);
        }
        console.log("mi array", this.categoriesSelected);
    };
    ModificarCategoriasPage.prototype.setselected = function (catid) {
        //console.log('event', $event,catid)
        this.categoriesSelected.push(catid);
    };
    ModificarCategoriasPage.prototype.guardarCategorias = function () {
        this.service.setGuardarCategoriasFav(this.categoriesSelected[0], this.categoriesSelected[1], this.categoriesSelected[2], this.categoriesSelected[3]).subscribe(function (x) {
        });
    };
    ModificarCategoriasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCategoriesPage');
    };
    ModificarCategoriasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-modificar-categorias',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/modificar-categorias/modificar-categorias.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>Select Categories</ion-title>\n    </ion-navbar>\n  </ion-header>\n  \n  <ion-content padding>\n    <ion-list *ngIf="categories">\n      <ion-item *ngFor="let cat of categories">\n       <ion-label>{{cat.nombre}}</ion-label>\n       <ion-checkbox color="secondary" [checked]="cat.ischecked" (ionChange)="selected($event,cat.categoriaid)" item-right></ion-checkbox>\n     </ion-item>\n    </ion-list>\n    <button ion-button (click)="goToTerminos()" [disabled]="!completolascats">Continuar</button>\n  </ion-content>\n  '/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/modificar-categorias/modificar-categorias.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], ModificarCategoriasPage);
    return ModificarCategoriasPage;
}());

//# sourceMappingURL=modificar-categorias.js.map

/***/ }),

/***/ 248:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(249);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(269);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 269:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__pages_create_cv_create_cv__ = __webpack_require__(145);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__pages_user_clasificado_user_clasificado__ = __webpack_require__(52);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_create_clasificado_create_clasificado__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_create_prod_user_create_prod_user__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_list_prod_cat_list_prod_cat__ = __webpack_require__(325);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_detail_clasificado_detail_clasificado__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_favorites_favorites__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_create_voucher_create_voucher__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_create_empleo_create_empleo__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__pages_detail_puesto_com_detail_puesto_com__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_list_empleos_list_empleos__ = __webpack_require__(192);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_all_categories_all_categories__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_curriculum_curriculum__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_perfil_perfil__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_search_search__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__tabs_tabs__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_select_categories_select_categories__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__app_component__ = __webpack_require__(326);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_home_home__ = __webpack_require__(98);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_list_list__ = __webpack_require__(327);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_login_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_signup_signup__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__pages_eventos_dia_eventos_dia__ = __webpack_require__(245);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__pages_categorias_categorias__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__pages_interna_prod_interna_prod__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__pages_mis_comercios_mis_comercios__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__pages_list_prod_list_prod__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__pages_create_prod_create_prod__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__pages_perfil_comercio_perfil_comercio__ = __webpack_require__(129);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__pages_trabajo_trabajo__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__pages_interna_prod_com_interna_prod_com__ = __webpack_require__(246);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__pages_detalle_puesto_detalle_puesto__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__pages_postulados_postulados__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__pages_menu_menu__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__angular_http__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__angular_common_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__pages_ultimo_paso_ultimo_paso__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__pages_voucher_voucher__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__pages_int_voucher_int_voucher__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__pages_int_tienda_int_tienda__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__providers_create_create__ = __webpack_require__(328);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__pages_mis_datos_mis_datos__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__pages_configuracion_configuracion__ = __webpack_require__(329);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__pages_mis_publicaciones_mis_publicaciones__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__pages_search_result_search_result__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__pages_ver_curriculum_ver_curriculum__ = __webpack_require__(124);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__pages_list_vouchers_list_vouchers__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__pages_search_result_trabajo_search_result_trabajo__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__components_voucher_voucher__ = __webpack_require__(330);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__pages_modificar_categorias_modificar_categorias__ = __webpack_require__(247);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__pages_int_evento_int_evento__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__ionic_native_facebook__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__pages_create_tienda_create_tienda__ = __webpack_require__(122);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__pages_int_prod_user_int_prod_user__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__ionic_native_camera__ = __webpack_require__(53);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






























































var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_18__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_15__tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_eventos_dia_eventos_dia__["a" /* EventosDiaPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_categorias_categorias__["a" /* CategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_interna_prod_interna_prod__["a" /* InternaProdPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_mis_comercios_mis_comercios__["a" /* MisComerciosPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_perfil_comercio_perfil_comercio__["a" /* PerfilComercioPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_int_tienda_int_tienda__["a" /* IntTiendaPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_create_prod_create_prod__["a" /* CreateProdPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_list_prod_list_prod__["a" /* ListProdPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_trabajo_trabajo__["a" /* TrabajoPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_interna_prod_com_interna_prod_com__["a" /* InternaProdComPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_detalle_puesto_detalle_puesto__["a" /* DetallePuestoPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_postulados_postulados__["a" /* PostuladosPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_select_categories_select_categories__["a" /* SelectCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_ultimo_paso_ultimo_paso__["a" /* UltimoPasoPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_voucher_voucher__["a" /* VoucherPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_int_voucher_int_voucher__["a" /* IntVoucherPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_curriculum_curriculum__["a" /* CurriculumPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_all_categories_all_categories__["a" /* AllCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_list_empleos_list_empleos__["a" /* ListEmpleosPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_detail_puesto_com_detail_puesto_com__["a" /* DetailPuestoComPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_empleo_create_empleo__["a" /* CreateEmpleoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_create_voucher_create_voucher__["a" /* CreateVoucherPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_detail_clasificado_detail_clasificado__["a" /* DetailClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_list_prod_cat_list_prod_cat__["a" /* ListProdCatPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_create_prod_user_create_prod_user__["a" /* CreateProdUserPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_mis_datos_mis_datos__["a" /* MisDatosPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_configuracion_configuracion__["a" /* ConfiguracionPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_mis_publicaciones_mis_publicaciones__["a" /* MisPublicacionesPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_ver_curriculum_ver_curriculum__["a" /* VerCurriculumPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_list_vouchers_list_vouchers__["a" /* ListVouchersPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_create_clasificado_create_clasificado__["a" /* CreateClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_search_result_trabajo_search_result_trabajo__["a" /* SearchResultTrabajoPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_user_clasificado_user_clasificado__["a" /* UserClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_55__components_voucher_voucher__["a" /* VoucherComponent */],
                __WEBPACK_IMPORTED_MODULE_56__pages_modificar_categorias_modificar_categorias__["a" /* ModificarCategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_create_cv_create_cv__["a" /* CreateCvPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_create_tienda_create_tienda__["a" /* CreateTiendaPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_int_evento_int_evento__["a" /* IntEventoPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_int_prod_user_int_prod_user__["a" /* IntProdUserPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_17__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_40__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_41__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_19_ionic_angular__["e" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */], { backButtonText: 'Atras' }, {
                    links: [
                        { loadChildren: '../pages/categorias/categorias.module#CategoriasPageModule', name: 'CategoriasPage', segment: 'categorias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/create-prod/create-prod.module#CreateProdPageModule', name: 'CreateProdPage', segment: 'create-prod', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/create-tienda/create-tienda.module#CreateTiendaPageModule', name: 'CreateTiendaPage', segment: 'create-tienda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/curriculum/curriculum.module#CurriculumPageModule', name: 'CurriculumPage', segment: 'curriculum', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/detalle-puesto/detalle-puesto.module#DetallePuestoPageModule', name: 'DetallePuestoPage', segment: 'detalle-puesto', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/eventos-dia/eventos-dia.module#EventosDiaPageModule', name: 'EventosDiaPage', segment: 'eventos-dia', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/favorites/favorites.module#FavoritesPageModule', name: 'FavoritesPage', segment: 'favorites', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/int-tienda/int-tienda.module#IntTiendaPageModule', name: 'IntTiendaPage', segment: 'int-tienda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/interna-prod-com/interna-prod-com.module#InternaProdComPageModule', name: 'InternaProdComPage', segment: 'interna-prod-com', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/interna-prod/interna-prod.module#InternaProdPageModule', name: 'InternaProdPage', segment: 'interna-prod', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list-prod/list-prod.module#ListProdPageModule', name: 'ListProdPage', segment: 'list-prod', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/list-vouchers/list-vouchers.module#ListVouchersPageModule', name: 'ListVouchersPage', segment: 'list-vouchers', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/menu/menu.module#MenuPageModule', name: 'MenuPage', segment: 'menu', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/mis-comercios/mis-comercios.module#MisComerciosPageModule', name: 'MisComerciosPage', segment: 'mis-comercios', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/modificar-categorias/modificar-categorias.module#ModificarCategoriasPageModule', name: 'ModificarCategoriasPage', segment: 'modificar-categorias', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil-comercio/perfil-comercio.module#PerfilComercioPageModule', name: 'PerfilComercioPage', segment: 'perfil-comercio', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/perfil/perfil.module#PerfilPageModule', name: 'PerfilPage', segment: 'perfil', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/postulados/postulados.module#PostuladosPageModule', name: 'PostuladosPage', segment: 'postulados', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result-trabajo/search-result-trabajo.module#SearchResultTrabajoPageModule', name: 'SearchResultTrabajoPage', segment: 'search-result-trabajo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search-result/search-result.module#SearchResultPageModule', name: 'SearchResultPage', segment: 'search-result', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/search/search.module#SearchPageModule', name: 'SearchPage', segment: 'search', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/select-categories/select-categories.module#SelectCategoriesPageModule', name: 'SelectCategoriesPage', segment: 'select-categories', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/trabajo/trabajo.module#TrabajoPageModule', name: 'TrabajoPage', segment: 'trabajo', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ultimo-paso/ultimo-paso.module#UltimoPasoPageModule', name: 'UltimoPasoPage', segment: 'ultimo-paso', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/ver-curriculum/ver-curriculum.module#VerCurriculumPageModule', name: 'VerCurriculumPage', segment: 'ver-curriculum', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/voucher/voucher.module#VoucherPageModule', name: 'VoucherPage', segment: 'voucher', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_37__ionic_storage__["a" /* IonicStorageModule */].forRoot()
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_19_ionic_angular__["c" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_55__components_voucher_voucher__["a" /* VoucherComponent */],
                __WEBPACK_IMPORTED_MODULE_20__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_21__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_list_list__["a" /* ListPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_signup_signup__["a" /* SignupPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_perfil_perfil__["a" /* PerfilPage */],
                __WEBPACK_IMPORTED_MODULE_15__tabs_tabs__["a" /* TabsPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_25__pages_eventos_dia_eventos_dia__["a" /* EventosDiaPage */],
                __WEBPACK_IMPORTED_MODULE_26__pages_categorias_categorias__["a" /* CategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_27__pages_interna_prod_interna_prod__["a" /* InternaProdPage */],
                __WEBPACK_IMPORTED_MODULE_28__pages_mis_comercios_mis_comercios__["a" /* MisComerciosPage */],
                __WEBPACK_IMPORTED_MODULE_31__pages_perfil_comercio_perfil_comercio__["a" /* PerfilComercioPage */],
                __WEBPACK_IMPORTED_MODULE_45__pages_int_tienda_int_tienda__["a" /* IntTiendaPage */],
                __WEBPACK_IMPORTED_MODULE_30__pages_create_prod_create_prod__["a" /* CreateProdPage */],
                __WEBPACK_IMPORTED_MODULE_29__pages_list_prod_list_prod__["a" /* ListProdPage */],
                __WEBPACK_IMPORTED_MODULE_32__pages_trabajo_trabajo__["a" /* TrabajoPage */],
                __WEBPACK_IMPORTED_MODULE_33__pages_interna_prod_com_interna_prod_com__["a" /* InternaProdComPage */],
                __WEBPACK_IMPORTED_MODULE_34__pages_detalle_puesto_detalle_puesto__["a" /* DetallePuestoPage */],
                __WEBPACK_IMPORTED_MODULE_35__pages_postulados_postulados__["a" /* PostuladosPage */],
                __WEBPACK_IMPORTED_MODULE_36__pages_menu_menu__["a" /* MenuPage */],
                __WEBPACK_IMPORTED_MODULE_16__pages_select_categories_select_categories__["a" /* SelectCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_42__pages_ultimo_paso_ultimo_paso__["a" /* UltimoPasoPage */],
                __WEBPACK_IMPORTED_MODULE_43__pages_voucher_voucher__["a" /* VoucherPage */],
                __WEBPACK_IMPORTED_MODULE_44__pages_int_voucher_int_voucher__["a" /* IntVoucherPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_curriculum_curriculum__["a" /* CurriculumPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_all_categories_all_categories__["a" /* AllCategoriesPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_list_empleos_list_empleos__["a" /* ListEmpleosPage */],
                __WEBPACK_IMPORTED_MODULE_9__pages_detail_puesto_com_detail_puesto_com__["a" /* DetailPuestoComPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_create_empleo_create_empleo__["a" /* CreateEmpleoPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_create_voucher_create_voucher__["a" /* CreateVoucherPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_favorites_favorites__["a" /* FavoritesPage */],
                __WEBPACK_IMPORTED_MODULE_5__pages_detail_clasificado_detail_clasificado__["a" /* DetailClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_list_prod_cat_list_prod_cat__["a" /* ListProdCatPage */],
                __WEBPACK_IMPORTED_MODULE_3__pages_create_prod_user_create_prod_user__["a" /* CreateProdUserPage */],
                __WEBPACK_IMPORTED_MODULE_48__pages_mis_datos_mis_datos__["a" /* MisDatosPage */],
                __WEBPACK_IMPORTED_MODULE_49__pages_configuracion_configuracion__["a" /* ConfiguracionPage */],
                __WEBPACK_IMPORTED_MODULE_50__pages_mis_publicaciones_mis_publicaciones__["a" /* MisPublicacionesPage */],
                __WEBPACK_IMPORTED_MODULE_51__pages_search_result_search_result__["a" /* SearchResultPage */],
                __WEBPACK_IMPORTED_MODULE_2__pages_create_clasificado_create_clasificado__["a" /* CreateClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_52__pages_ver_curriculum_ver_curriculum__["a" /* VerCurriculumPage */],
                __WEBPACK_IMPORTED_MODULE_53__pages_list_vouchers_list_vouchers__["a" /* ListVouchersPage */],
                __WEBPACK_IMPORTED_MODULE_54__pages_search_result_trabajo_search_result_trabajo__["a" /* SearchResultTrabajoPage */],
                __WEBPACK_IMPORTED_MODULE_1__pages_user_clasificado_user_clasificado__["a" /* UserClasificadoPage */],
                __WEBPACK_IMPORTED_MODULE_56__pages_modificar_categorias_modificar_categorias__["a" /* ModificarCategoriasPage */],
                __WEBPACK_IMPORTED_MODULE_0__pages_create_cv_create_cv__["a" /* CreateCvPage */],
                __WEBPACK_IMPORTED_MODULE_59__pages_create_tienda_create_tienda__["a" /* CreateTiendaPage */],
                __WEBPACK_IMPORTED_MODULE_57__pages_int_evento_int_evento__["a" /* IntEventoPage */],
                __WEBPACK_IMPORTED_MODULE_60__pages_int_prod_user_int_prod_user__["a" /* IntProdUserPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_38__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_39__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_58__ionic_native_facebook__["a" /* Facebook */],
                { provide: __WEBPACK_IMPORTED_MODULE_18__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_19_ionic_angular__["d" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_46__providers_services_services__["a" /* ServicesProvider */],
                __WEBPACK_IMPORTED_MODULE_47__providers_create_create__["a" /* CreateProvider */],
                __WEBPACK_IMPORTED_MODULE_61__ionic_native_camera__["a" /* Camera */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 28:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InternaProdPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__int_tienda_int_tienda__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__user_clasificado_user_clasificado__ = __webpack_require__(52);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





//import { COMERCIOS } from './../../data/comercios-mok';
var InternaProdPage = /** @class */ (function () {
    function InternaProdPage(navCtrl, navParams, serviceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.data_prod = this.navParams.data;
        this.isChecked = (this.data_prod.fav != 0);
    }
    InternaProdPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad InternaProdPage');
        console.log('aqui', this.navParams);
    };
    InternaProdPage.prototype.favorito = function (productoid) {
        (this.isChecked) ? this.removeFavorito(productoid) : this.addFavorito(productoid);
    };
    InternaProdPage.prototype.addFavorito = function (productid) {
        var _this = this;
        this.serviceProvider.setGuardarProdFav(productid).subscribe(function (x) {
            console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = true : _this.isChecked;
        });
    };
    InternaProdPage.prototype.removeFavorito = function (productid) {
        var _this = this;
        this.serviceProvider.borrarFavorito(productid).subscribe(function (x) {
            //console.log('x', x);
            (x['status'] === 200) ? _this.isChecked = false : _this.isChecked;
        });
    };
    InternaProdPage.prototype.goToIntTienda = function () {
        var _this = this;
        if (this.data_prod.tiendaid == null) {
            console.log("data prod", this.data_prod);
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__user_clasificado_user_clasificado__["a" /* UserClasificadoPage */], this.data_prod.usuarioid);
        }
        else {
            this.serviceProvider.getTiendaPorId(this.data_prod.tiendaid).subscribe(function (x) {
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__int_tienda_int_tienda__["a" /* IntTiendaPage */], JSON.parse(x["data"]));
            });
        }
    };
    InternaProdPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-interna-prod',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/interna-prod/interna-prod.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Interna Producto</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="logoutme()">\n        <ion-icon name=\'\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-slides>\n      <ion-slide *ngFor="let img of data_prod.imagenes">\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{img}}" alt="imagen producto">\n      </ion-slide>\n    </ion-slides>\n  </ion-item>\n  <ion-item>\n    <ion-row>\n     <ion-col>\n       <h1>{{data_prod.nombre}}</h1>\n       <p>${{data_prod.precio}}</p>\n     </ion-col> \n     <ion-col>\n       <!-- <ion-icon name="heart-empty" color="violeta"></ion-icon> -->\n       <ion-icon style="font-size: 1.4em; margin: 5px;" float-right [color]="isChecked ? \'danger\' : \'dark\'" name="heart" (click)="favorito(data_prod.productoid)"></ion-icon>\n     </ion-col>\n    </ion-row>\n  </ion-item>\n  <ion-item>\n    <ion-icon name="desktop"></ion-icon>\n    {{data_prod.tienda}}<span (click)="goToIntTienda(data_prod.tiendaid)"><a style="font-size: 0.7em;">Ver perfil tienda</a></span>\n  </ion-item>\n  <ion-card>\n    <ion-card-header>\n      <ion-icon name="list-box"></ion-icon>\n      Descripción      \n    </ion-card-header>\n    <ion-card-content>\n      <p>{{data_prod.detalle}}</p>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/interna-prod/interna-prod.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], InternaProdPage);
    return InternaProdPage;
}());

//# sourceMappingURL=interna-prod.js.map

/***/ }),

/***/ 325:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListProdCatPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ListProdCatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListProdCatPage = /** @class */ (function () {
    function ListProdCatPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.catid = this.navParams.data;
        this.service.getProdxCategoria(this.catid).subscribe(function (x) {
            console.log('aqui', JSON.parse(x['data']));
        });
    }
    ListProdCatPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListProdCatPage');
    };
    ListProdCatPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-prod-cat',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-prod-cat/list-prod-cat.html"*/'<!--\n  Generated template for the ListProdCatPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>listProdCat</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-prod-cat/list-prod-cat.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], ListProdCatPage);
    return ListProdCatPage;
}());

//# sourceMappingURL=list-prod-cat.js.map

/***/ }),

/***/ 326:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(243);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(244);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_login_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//import { SelectCategoriesPage } from './../pages/select-categories/select-categories';
//import { UltimoPasoPage } from './../pages/ultimo-paso/ultimo-paso';
//import { SignupPage } from './../pages/signup/signup';






//import { UltimoPasoPage } from '../pages/ultimo-paso/ultimo-paso';
var MyApp = /** @class */ (function () {
    //pages: Array<{title: string, component: any}>;
    function MyApp(platform, statusBar, splashScreen, storage) {
        var _this = this;
        this.platform = platform;
        this.statusBar = statusBar;
        this.splashScreen = splashScreen;
        this.storage = storage;
        //@ViewChild(Nav) nav: Nav;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_login_login__["a" /* LoginPage */];
        this.platform.ready().then(function () {
            /* storage.get("_uid_").then(x => {
              if (x != null && x > 0) {
                this.rootPage = MenuPage;
              }
              else{
                this.rootPage = LoginPage;
              }
            }); */
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            _this.statusBar.styleDefault();
            if (platform.is("android")) {
                statusBar.overlaysWebView(false);
                statusBar.backgroundColorByHexString("#000000");
            }
            _this.splashScreen.hide();
        });
        // used for an example of ngFor and navigation
        /* this.pages = [
          { title: 'Home', component: HomePage },
          { title: 'Perfil', component: ListPage },
          {title: 'Mis Comercios', component: MisComerciosPage },
          {title: 'Puestos de Trabajo', component: TrabajoPage }
        ]; */
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/app/app.html"*/'<!-- <ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar>\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content>\n    <ion-list>\n      <button menuClose ion-item *ngFor="let p of pages" (click)="openPage(p)">\n        {{p.title}}\n      </button>\n    </ion-list>\n  </ion-content>\n\n</ion-menu> -->\n\n<!-- Disable swipe-to-go-back because it\'s poor UX to combine STGB with side menus -->\n<ion-nav [root]="rootPage"></ion-nav>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 327:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_voucher_create_voucher__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { IntVoucherPage } from '../int-voucher/int-voucher';
var ListPage = /** @class */ (function () {
    function ListPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ListPage.prototype.goToCreate = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__create_voucher_create_voucher__["a" /* CreateVoucherPage */]);
    };
    ListPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-list',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list/list.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Mis Vouchers</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n    <button ion-button full color="primary" (click)="goToCreate()">Crear nuevo Voucher</button>\n  </ion-badge>\n  <ion-card>\n    <ion-card-header>\n      Mis Vouchers Publicados\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list *ngFor="let i of [1,2,3,4,5]">\n        <ion-item text-wrap>\n          <img style="max-width: 65% !important;" src="http://www.bookpte.com/wp-content/uploads/2015/03/voucher-img.png" alt="imagen voucher">\n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list/list.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */]])
    ], ListPage);
    return ListPage;
}());

//# sourceMappingURL=list.js.map

/***/ }),

/***/ 328:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CreateProvider = /** @class */ (function () {
    function CreateProvider(http) {
        this.http = http;
        console.log('Hello CreateProvider Provider');
    }
    CreateProvider.prototype.createProdTienda = function (nombre, detalle, tiendaid, precio, categoriaid, imagenes) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearproductotienda.php";
        return;
    };
    CreateProvider.prototype.createProdUser = function (nombre, detalle, usuarioid, precio, categoriaid, imagenes) {
        //imagenes array de base64;
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php";
        return;
    };
    CreateProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], CreateProvider);
    return CreateProvider;
}());

//# sourceMappingURL=create.js.map

/***/ }),

/***/ 329:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConfiguracionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ConfiguracionPage = /** @class */ (function () {
    function ConfiguracionPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ConfiguracionPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ConfiguracionPage');
    };
    ConfiguracionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-configuracion',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/configuracion/configuracion.html"*/'<!--\n  Generated template for the ConfiguracionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>configuracion</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/configuracion/configuracion.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], ConfiguracionPage);
    return ConfiguracionPage;
}());

//# sourceMappingURL=configuracion.js.map

/***/ }),

/***/ 330:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoucherComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/**
 * Generated class for the VoucherComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
var VoucherComponent = /** @class */ (function () {
    function VoucherComponent() {
        console.log('Hello VoucherComponent Component');
        this.text = 'Hello World';
    }
    VoucherComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'voucher',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/components/voucher/voucher.html"*/'<div class="voucher-ticket">\n  <img src="../.././assets/imgs/voucher/voucher-ticket.png" alt="img voucher">\n  <div>\n    <p>Batistela</p>\n    <p>VOUCHER</p>\n  </div>\n</div>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/components/voucher/voucher.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], VoucherComponent);
    return VoucherComponent;
}());

//# sourceMappingURL=voucher.js.map

/***/ }),

/***/ 35:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__favorites_favorites__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mis_comercios_mis_comercios__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, appCtrl, storage) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.appCtrl = appCtrl;
        this.storage = storage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_5__tabs_tabs__["a" /* TabsPage */];
        this.username = "";
        this.pages = [
            {
                title: "Home",
                pageName: "HomePage",
                tabComponent: "HomePage",
                index: 0,
                icon: "home",
                isMenu: true
            },
            {
                title: "Vouchers",
                pageName: "VoucherPage",
                tabComponent: "VoucherPage",
                index: 1,
                icon: "home",
                isMenu: true
            },
            {
                title: "Favoritos",
                pageName: __WEBPACK_IMPORTED_MODULE_0__favorites_favorites__["a" /* FavoritesPage */],
                tabComponent: "FavoritesPage",
                index: 5,
                icon: "home",
                isMenu: false
            },
            {
                title: "Buscar",
                pageName: "SearchPage",
                tabComponent: "SearchPage",
                index: 3,
                icon: "home",
                isMenu: true
            },
            {
                title: "Clasificado",
                pageName: "TrabajoPage",
                tabComponent: "TrabajoPage",
                index: 4,
                icon: "home",
                isMenu: true
            }
        ];
        console.log("params", this.navParams.data);
    }
    MenuPage.prototype.openPage = function (page) {
        var params = {};
        if (page.isMenu) {
            if (page.index) {
                params = { tabIndex: page.index };
                //console.log('aqui', params)
            }
            if (this.nav.getAllChildNavs() && page.index != undefined) {
                console.log("jaja", this.nav.getAllChildNavs());
                this.nav.getActiveChildNav().select(page.index);
            }
            else {
                //this.nav.setRoot(page.pageName, params);
            }
        }
        else {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__favorites_favorites__["a" /* FavoritesPage */]);
            //this.nav.setRoot('HomePage',{tabIndex: 0})
        }
    };
    MenuPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        console.log("param", this.navParams.data);
        //this.navCtrl.setRoot(VoucherPage);
        //console.log('aqui',this.nav.getActiveChildNav());
        if (this.navParams.data > 0) {
            var result = this.pages.filter(function (x) { return x.index == _this.navParams.data; })[0];
            //console.log(result);
            this.openPage(result);
            //console.log('page', this.nav.getAllChildNavs());
            /*this.openPage(this.page); */
            //this.nav.getActiveChildNav().select(this.myIndex);
        }
    };
    MenuPage.prototype.goToMiTienda = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__mis_comercios_mis_comercios__["a" /* MisComerciosPage */]);
    };
    MenuPage.prototype.logout = function () {
        this.storage.set("_uid_", null);
        this.appCtrl.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_3__login_login__["a" /* LoginPage */]);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Nav */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["i" /* Nav */])
    ], MenuPage.prototype, "nav", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: "page-menu",template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/menu/menu.html"*/'<ion-menu id="sidemenu" [content]="content">\n  <ion-header id="sidemenu-header">\n    <ion-item style=" margin-top: 10%;">\n      <ion-avatar item-end>\n        <img src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n      </ion-avatar>\n\n      <ion-icon style="color:white;" name="close" item-start menuClose></ion-icon>\n      <!-- <h2>\n        Exequiel Castro\n      </h2> -->\n    </ion-item>\n  </ion-header>\n\n  <ion-content>\n    <ion-list class="list-links">\n      <div *ngFor="let p of pages">\n        <button class="links" ion-item detail-none block center text-center menuClose (click)="openPage(p)">\n          <!-- <ion-icon item-start [name]="p.icon"></ion-icon> -->\n          {{ p.title }}\n        </button>\n      </div>\n      <button class="links" ion-item detail-none block center text-center menuClose (click)="goToMiTienda()">Tienda virtual\n      </button>\n\n    </ion-list>\n\n  </ion-content>\n\n  <ion-footer>\n    <ion-row (click)="logout()">\n      <ion-col class="logout">\n        <ion-icon name="log-out"></ion-icon>\n        <p>Cerra sesión</p>\n      </ion-col>\n    </ion-row>\n  </ion-footer>\n\n</ion-menu>\n\n<ion-nav [root]="rootPage" #content main swipeBackEnabled="false"></ion-nav>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/menu/menu.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ }),

/***/ 4:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServicesProvider; });
/* unused harmony export evento */
/* unused harmony export usuario */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(95);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(188);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__ = __webpack_require__(299);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_storage__ = __webpack_require__(44);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ServicesProvider = /** @class */ (function () {
    function ServicesProvider(httpPost, http, storage) {
        this.httpPost = httpPost;
        this.http = http;
        this.storage = storage;
        this.categorias = [];
        this.usuarioId = 1;
        this._usuario = new usuario();
        console.log('Hello ServicesProvider Provider');
    }
    ServicesProvider.prototype.crearusuario = function (nombre, apellido, fechanacimiento, email, password, localidad, direccion, telefono) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ nombre: nombre, apellido: apellido, fechanacimiento: fechanacimiento, email: email, contrasenia: password, direccion: direccion, telefono: telefono, localidad: localidad, facebookid: 1 });
        console.log(body);
        return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/registrarusuario.php", body, { headers: headers, withCredentials: true });
    };
    /*   crearusuario(nombre, apellido, fechanacimiento, email, password, localidad, direccion, telefono): Observable<any> {
        console.log("id persona",this.usuarioId)
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?nombre=' + nombre+ "&apellido=" + apellido+ "&apellido=" +fechanacimiento+ this.nombre+ "&apellido=" + this.email+ this.nombre+ "&apellido=" + this.password+ this.nombre+ "&apellido=" + this.localidad+ this.nombre+ "&apellido=" + this.direccion+ this.nombre+ "&apellido=" + this.telefono);
    
      } */
    ServicesProvider.prototype.login = function (name, pw) {
        return this.http.get("http://ctrlztest.com.ar/ranto/apirest/validarusuario.php?usuario=" + name + "&password=" + pw)
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (x) {
        }));
    };
    ServicesProvider.prototype.setUserId = function (userid) {
        console.log("set id", userid);
        this.storage.set("_uid_", userid);
        this.usuarioId = userid;
    };
    //traerUsuario
    ServicesProvider.prototype.getUserporid = function (userid) {
        console.log("id persona", userid);
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?usuarioid=' + userid);
    };
    ServicesProvider.prototype.getMisDatos = function () {
        console.log("id persona", this.usuarioId);
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerusuarioporid.php?usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getProvinciasYLocalidades = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerprovinciasylocalidades.php');
    };
    //traermiscategorias.php
    ServicesProvider.prototype.getCategories = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercategorias.php');
    };
    //traerproductoscategoria.php
    ServicesProvider.prototype.getProdxCategoria = function (categoriaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductoscategoria.php?categoriaid=' + categoriaid);
    };
    ServicesProvider.prototype.getProductosPorUsuario = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductosusuario.php?usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getProductosPorTienda = function (tiendaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductostienda.php?tiendaid=' + tiendaid);
    };
    ServicesProvider.prototype.getProductosPorCategoria = function (categoriaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerproductoscategoriausuario.php?categoriaid=' + categoriaid + '&usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getCVPorUsuario = function (uid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercvporusuario.php?usuarioid=' + uid);
    };
    ServicesProvider.prototype.getMiCV = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traercvporusuario.php?usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getSlides = function () {
        return this.http.get('../../assets/data/slides-mok.json');
    };
    ServicesProvider.prototype.getClasificados = function () {
        return this.http.get('../../assets/data/clasificados-mok.json');
    };
    ServicesProvider.prototype.getMisComercios = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermistiendas.php?usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getPuestosPorTienda = function (tiendaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerpuestosportienda.php?tiendaid=' + tiendaid);
    };
    ServicesProvider.prototype.getVouchersPorTienda = function (tiendaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traervouchersportienda.php?tiendaid=' + tiendaid);
    };
    ServicesProvider.prototype.usarVoucher = function (voucherid) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/usarvoucher.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ usuarioid: this.usuarioId, voucherid: voucherid });
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.borrarVoucher = function (voucherid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/borrarvoucherusuario.php?usuarioid=' + this.usuarioId + '&voucherid=' + voucherid);
    };
    ServicesProvider.prototype.borrarFavorito = function (productid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/borrarfavoritoproducto.php?productoid=' + productid + '&usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.setGuardarProdFav = function (productid) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var body = JSON.stringify({ ususarioid: this.usuarioId, productoid: productid });
        return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/crearfavoritoproducto.php", body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.setGuardarCategoriasFav = function (cat1, cat2, cat3, cat4) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ usuarioid: this.usuarioId, categoriaid1: cat1, categoriaid2: cat2, categoriaid3: cat3, categoriaid4: cat4 });
        return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/guardarcategoriasfav.php", body, { headers: headers, withCredentials: true })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (data) { return console.log('All: ' + JSON.stringify(data)); }));
    };
    ServicesProvider.prototype.setPostularsePuesto = function (puestoid) {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ usuarioid: this.usuarioId, puestoid: puestoid });
        return this.httpPost.post("http://ctrlztest.com.ar/ranto/apirest/postularsepuesto.php", body, { headers: headers, withCredentials: true })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (data) { return console.log('All: ' + JSON.stringify(data)); }));
    };
    /*   http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php
      nombre,detalle,usuarioid,precio,categoriaid,imagenes */
    ServicesProvider.prototype.crearProductoUsuario = function (nombre, detalle, precio, categoriaid, imagenes) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearproductousuario.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ nombre: nombre, detalle: detalle, precio: precio, categoriaid: categoriaid, imagenes: imagenes, usuarioid: this.usuarioId, fechapublicacion: new Date() });
        console.log("params crear prod", body);
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.crearProductoTienda = function (nombre, detalle, precio, categoriaid, imagenes, tiendaid) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearproductotienda.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ nombre: nombre, detalle: detalle, precio: precio, categoriaid: categoriaid, imagenes: imagenes, tiendaid: tiendaid, fechapublicacion: new Date() });
        console.log("body tienda", body);
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.crearPuestoTrabajo = function (tiendaid, titulo, lugar, cargahorariaid, areaid, salario, horario, detalle) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearpuesto.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ tiendaid: tiendaid, titulo: titulo, direccion: lugar, cargahorariaid: cargahorariaid, areaid: areaid, salario: salario, fechapublicacion: new Date(), horario: horario, detalle: detalle });
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.crearTienda = function (nombre, direccion, telefono, imagen) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/creartienda.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        // console.log("uid", this.usuarioId, this._usuario.usuarioid)
        var body = JSON.stringify({ nombre: nombre, direccion: direccion, telefono: telefono, imagen: imagen, usuarioid: this.usuarioId });
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    //POST CREAR CLASIFICADO
    ServicesProvider.prototype.crearClasificado = function (titulo, detalle) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearclasificado.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ titulo: titulo, detalle: detalle });
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true })
            .pipe(Object(__WEBPACK_IMPORTED_MODULE_3_rxjs_operators_tap__["tap"])(function (data) { return console.log('All: ' + JSON.stringify(data)); }));
    };
    ServicesProvider.prototype.crearVocuher = function (tiendaid, titulo, detalle, fechavencimiento, cantidad) {
        var url = "http://ctrlztest.com.ar/ranto/apirest/crearvoucher.php";
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Headers */]();
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
        headers.append('Accept', 'application/json');
        headers.append('content-type', 'application/json');
        var requestOptions = new __WEBPACK_IMPORTED_MODULE_2__angular_http__["d" /* RequestOptions */]({ headers: headers });
        var body = JSON.stringify({ tiendaid: tiendaid, titulo: titulo, fechapublicacion: new Date(), fechavencimiento: fechavencimiento, cantidad: cantidad, detalle: detalle });
        return this.httpPost.post(url, body, { headers: headers, withCredentials: true });
    };
    ServicesProvider.prototype.getPostulados = function (puestoid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerpostuladosporpuesto.php?puestoid=' + puestoid);
    };
    ServicesProvider.prototype.getMisCategorias = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermiscategorias.php?usuarioid=' + this.usuarioId);
    };
    ServicesProvider.prototype.getPuestosyClasificados = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerbusquedasyclasificados.php');
    };
    //traermisvouchers.php
    ServicesProvider.prototype.getMisVouchers = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermisvouchers.php?usuarioid=' + this.usuarioId);
    };
    //traermisfavoritos
    ServicesProvider.prototype.getMisFavoritos = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traermisfavoritos.php?usuarioid=' + this.usuarioId);
    };
    //traereventos.php
    ServicesProvider.prototype.getEventos = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traereventos.php');
    };
    //traerultimosproductos.php
    ServicesProvider.prototype.getUltimosSubidos = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerultimosproductos.php');
    };
    ServicesProvider.prototype.getTiendaPorId = function (tiendaid) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traertiendaporid.php?tiendaid=' + tiendaid);
    };
    //busqueda productos autocomplete
    ServicesProvider.prototype.buscarProductosAuto = function (val) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaprodsauto.php?texto=' + val);
    };
    //busqueda productos
    ServicesProvider.prototype.buscarProductos = function (val, desde) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaprods.php?texto=' + val + '&desde=' + desde);
    };
    //busqueda empleos autocomplete
    ServicesProvider.prototype.buscarEmpleosAuto = function (val) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaempleosauto.php?texto=' + val);
    };
    //busqueda empleos
    ServicesProvider.prototype.buscarEmpleos = function (val, desde) {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/busquedaempleos.php?texto=' + val + '&desde=' + desde);
    };
    ServicesProvider.prototype.getAreayYCargahoraria = function () {
        return this.http.get('http://ctrlztest.com.ar/ranto/apirest/traerareaycargahoraria.php');
    };
    ServicesProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* Http */], __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__ionic_storage__["b" /* Storage */]])
    ], ServicesProvider);
    return ServicesProvider;
}());

var evento = /** @class */ (function () {
    function evento() {
    }
    return evento;
}());

var usuario = /** @class */ (function () {
    function usuario() {
    }
    return usuario;
}());

//# sourceMappingURL=services.js.map

/***/ }),

/***/ 45:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntTiendaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__interna_prod_interna_prod__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var IntTiendaPage = /** @class */ (function () {
    function IntTiendaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataTienda = this.navParams.data[0];
        this.productos = JSON.parse(this.dataTienda.productos);
    }
    IntTiendaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntTiendaPage');
        console.log('data', this.dataTienda);
    };
    IntTiendaPage.prototype.goToInternaProd = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__interna_prod_interna_prod__["a" /* InternaProdPage */], product);
    };
    IntTiendaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-int-tienda',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-tienda/int-tienda.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Tienda Virtual</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <img style="display: flex; margin: 0 auto;" src="http://ctrlztest.com.ar/ranto/apirest/{{dataTienda.imgpath}}" alt="imagen tienda">\n  <div padding>\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-icon name="desktop" item-start></ion-icon>\n            {{dataTienda.nombre}}\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-icon name="pin" item-start></ion-icon>\n            {{dataTienda.direccion}} <span><p style="font-size: 0.7em;">Ver ubicación</p></span>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <ion-item>\n          <ion-icon name="call" item-start></ion-icon>\n            {{dataTienda.telefono}} <span><p style="font-size: 0.7em;">Llamar</p></span>\n        </ion-item>\n      </ion-col>\n    </ion-row>\n    <!-- <ion-row>\n      <ion-col>\n        <ion-item text-wrap>\n          <ion-icon name="logo-facebook" item-start></ion-icon>\n            {{dataTienda.face}}\n        </ion-item>\n      </ion-col>\n    </ion-row> -->\n  </div>\n  <ion-badge color="violeta" style="width: 100%; border-radius: 0px !important;">\n    <ion-item no-lines style="background-color: transparent !important;">\n      <ion-icon name="bookmarks" item-start></ion-icon>\n      Solicita vouchers Rantos\n    </ion-item>\n  </ion-badge>\n  <ion-grid>\n    <ion-card>\n      <ion-card-header>\n        Publicaciones\n      </ion-card-header>\n      <ion-card-content>\n        <ion-row>\n          <ion-col *ngFor="let product of productos" (click)="goToInternaProd(product)" col-6>\n            <ion-card>\n              <img src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}" alt="imagen producto">\n              <ion-card-content>\n                <p>${{product.nombre}}</p>\n              </ion-card-content>\n            </ion-card>\n          </ion-col>\n        </ion-row>\n      </ion-card-content>\n    </ion-card>\n    </ion-grid>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-tienda/int-tienda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */]])
    ], IntTiendaPage);
    return IntTiendaPage;
}());

//# sourceMappingURL=int-tienda.js.map

/***/ }),

/***/ 46:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(191);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__signup_signup__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__menu_menu__ = __webpack_require__(35);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { MenuPage } from './../menu/menu';



/* import { HomePage } from './../home/home';
 */
var LoginPage = /** @class */ (function () {
    function LoginPage(toastCtrl, navCtrl, navParams, modalCtrl, fb, serviceProvider) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.fb = fb;
        this.serviceProvider = serviceProvider;
        this.showMsgError = false;
        this.msgError = "";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log("ionViewDidLoad LoginPage");
    };
    LoginPage.prototype.signin = function () {
        var _this = this;
        if (this.validacion()) {
            this.serviceProvider.login(this.username, this.pw)
                .subscribe(function (x) {
                console.log("login", x);
                var userid = JSON.parse(x["data"]).usuarioid;
                if (userid != null) {
                    console.log("mi id:", userid);
                    _this.serviceProvider.setUserId(JSON.parse(x['data']).usuarioid);
                    _this.serviceProvider._usuario = JSON.parse(x["data"]);
                    // this.setUserId(this._usuario.usuarioid);
                    _this.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_5__menu_menu__["a" /* MenuPage */]);
                }
                else {
                    //msgerror	
                    _this.msgError = "El usuario y/o la contrasenia son incorrectos.";
                    _this.showMsgError = true;
                    _this.toastError();
                }
            });
        }
        else {
            //msgerror	
            this.showMsgError = true;
            this.toastError();
        }
    };
    LoginPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.username == "") {
            ret = false;
            msg += "Debe completar el email\n";
        }
        if (this.pw == "") {
            ret = false;
            msg += "Debe completar el password";
        }
        this.msgError = msg;
        return ret;
    };
    LoginPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            duration: 5000,
            closeButtonText: "X",
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    LoginPage.prototype.createAccount = function () {
        var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
        modal.present();
    };
    LoginPage.prototype.fblogin = function () {
        var _this = this;
        //permissions
        this.fb.login(['public_profile', 'email'])
            .then(function (res) {
            if (res.status == "connected") {
                console.log('entro');
                //Get user ID an Token
                var fb_id = res.authResponse.userID;
                var fb_token = res.authResponse.accessToken;
                _this.serviceProvider.fbIdUser = fb_id;
                console.log('id and toke', fb_id, fb_token);
                //Get user infos from the API
                _this.fb.api("/me?fields=name,email", [])
                    .then(function (user) {
                    var name = user.name;
                    var email = user.email;
                    if (email != "") {
                        //this.storage.set('emailFB', email);
                        //this.service.getTokenEmail(email);  
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__signup_signup__["a" /* SignupPage */]);
                    }
                });
            }
            else {
                //error ocurred while loging-in
                console.log("Error ocurred");
            }
        })
            .catch(function (error) {
            console.log('Error logging into Facebook', error);
        });
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: "page-login",template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/login/login.html"*/'<ion-content>\n  <ion-grid>\n    <ion-row>\n      <ion-col>\n        <img class="logo1" src="../../assets/imgs/login/logo-blanco.png" alt="logo ranto">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <img class="logo2" src="../../assets/imgs/login/iso-circulos.png" alt="logo ranto">\n      </ion-col>\n    </ion-row>\n    <ion-row>\n      <ion-col>\n        <h3 style="margin: 0px !important;">Empezar!</h3>\n      </ion-col>\n    </ion-row>\n    <ion-row justify-content-center style="margin-top: 10px;">\n      <button color="facebook" ion-button icon-start (click)="fblogin()">\n        <ion-icon name="logo-facebook"></ion-icon>\n        Iniciar con Facebook\n      </button>\n    </ion-row>\n  </ion-grid>\n  <ion-list>\n    <ion-item no-lines>\n      <ion-label style="font-size: .7em;" color="light" floating>Username</ion-label>\n      <ion-input style="font-size: .8em;" type="text" [(ngModel)]="username"></ion-input>\n    </ion-item>\n    <ion-item style="border-bottom: none !important">\n      <ion-label style="font-size: .8em;" color="light" floating>Password</ion-label>\n      <ion-input style="font-size: .9em;" type="password" [(ngModel)]="pw"></ion-input>\n    </ion-item>\n  </ion-list>\n  <button ion-button color="violeta" full (click)="signin()">Entrar</button>\n</ion-content>\n<ion-footer>\n  <ion-row>\n    <ion-col (click)="createAccount()">\n      <p>No tenes cuenta?</p>\n    </ion-col>\n    <ion-col (click)="createAccount()">\n      <p>Crear cuenta</p>\n    </ion-col>\n  </ion-row>\n</ion-footer>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/login/login.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_4__providers_services_services__["a" /* ServicesProvider */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 52:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserClasificadoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserClasificadoPage = /** @class */ (function () {
    function UserClasificadoPage(navCtrl, navParams, services) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.dataUser = [];
        console.log("interna user", this.navParams.data);
        this.services.getUserporid(this.navParams.data).subscribe(function (x) {
            _this.dataUser = JSON.parse(x['data']);
            console.log("data user", _this.dataUser);
        });
    }
    UserClasificadoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad UserClasificadoPage');
    };
    UserClasificadoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-user-clasificado',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/user-clasificado/user-clasificado.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Vendedor</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-row justify-content-center>\n    <img style="width: 150px !important; height: 150px !important;" src="https://img.icons8.com/ios/1600/user-male-circle-filled.png">\n  </ion-row>\n  <ion-list *ngFor="let user of dataUser">\n    <ion-row justify-content-center>\n      <p><strong>{{user.nombre}} {{user.apellido}}</strong></p>\n    </ion-row>\n    <ion-row justify-content-center>\n      <p><strong>{{user.email}}</strong></p>\n    </ion-row>\n    <ion-row justify-content-center>\n      <p><strong>{{user.telefono}}</strong></p>\n    </ion-row>\n  </ion-list>\n  <ion-row justify-content-center>\n    <ion-col style="text-align: center;">\n      <button ion-button icon-only>\n        <ion-icon name="call"></ion-icon>\n      </button>\n    </ion-col>\n    <ion-col style="text-align: center;">\n      <button ion-button icon-only>\n        <ion-icon name="mail"></ion-icon>\n      </button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/user-clasificado/user-clasificado.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], UserClasificadoPage);
    return UserClasificadoPage;
}());

//# sourceMappingURL=user-clasificado.js.map

/***/ }),

/***/ 59:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CategoriasPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__interna_prod_interna_prod__ = __webpack_require__(28);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { Http } from '@angular/http';
//import 'rxjs/add/operator/map'
//import { CATEGORIAS } from './../../data/slides-mok';
//import { OTHER } from './../../data/categories-mok';
//import { PRODUCTOS } from '../../data/listProducts-mok';

var CategoriasPage = /** @class */ (function () {
    function CategoriasPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.data = [];
        this.products = [];
        this.time = new Date();
        //this.getSlides();
        console.log('caty', this.navParams.data);
        this.getProducts(this.navParams.data.categoriaid);
        this.titulo = this.navParams.data.nombre;
    }
    CategoriasPage.prototype.getSlides = function () {
        var _this = this;
        this.service.getSlides().subscribe(function (data) {
            _this.data = data;
            _this.slides1 = _this.data[0].data1;
            _this.slides2 = _this.data[0].data2;
        });
    };
    CategoriasPage.prototype.getProducts = function (categoriaid) {
        var _this = this;
        this.service.getProductosPorCategoria(categoriaid).subscribe(function (x) {
            console.log('data', JSON.parse(x['data']));
            _this.products = JSON.parse(x['data']);
        });
    };
    CategoriasPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CategoriasPage');
    };
    CategoriasPage.prototype.goToIntProd = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__interna_prod_interna_prod__["a" /* InternaProdPage */], product);
    };
    CategoriasPage.prototype.goTointerna = function (slide) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__interna_prod_interna_prod__["a" /* InternaProdPage */], { data: slide });
    };
    CategoriasPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-categorias',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/categorias/categorias.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>{{titulo}}</ion-title>\n    <ion-buttons start>\n      <button ion-button icon-only (click)="logoutme()">\n        <ion-icon name=\'\'></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-grid>\n    <ion-row *ngIf="products.length > 0">\n      <ion-col *ngFor="let product of products" col-6>\n        <ion-card style="width: 100% !important; margin: 0px !important; min-height: 177px !important;" (click)="goToIntProd(product)">\n          <img style="min-height: 105px;" src="http://ctrlztest.com.ar/ranto/apirest/{{product.imagenes}}" alt="imagen producto">\n          <ion-card-content style="padding: 5px !important;">\n            <ion-card-header style="padding:0px !important;">\n              <p text-wrap style="font-size: 1em;"><strong>{{product.nombre}}</strong></p>\n            </ion-card-header>\n            <p text-wrap style="color: #488aff;font-size: 1em;">{{product.precio | currency}}.-ARS</p>\n          </ion-card-content>\n          <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n            <p style="font-size: 0.8em; text-align: start;">\n              <ion-icon style="margin-right: 5px;" name="time"></ion-icon>Termina en {{time | date: \'dd-MM\'}}\n            </p>\n          </ion-badge>\n        </ion-card>\n      </ion-col>\n    </ion-row>\n    <ion-row *ngIf="products.length == 0">\n      <ion-col text-center>\n        <p text-wrap><strong>Todavia no hay productos en esta categoría.</strong></p>\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/categorias/categorias.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], CategoriasPage);
    return CategoriasPage;
}());

//# sourceMappingURL=categorias.js.map

/***/ }),

/***/ 60:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DetallePuestoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__postulados_postulados__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DetallePuestoPage = /** @class */ (function () {
    function DetallePuestoPage(navCtrl, navParams, alertCtrl, serviceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.serviceProvider = serviceProvider;
        this.detalle_puesto = this.navParams.data;
        console.log('detalle', this.detalle_puesto);
    }
    DetallePuestoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DetallePuestoPage');
        console.log('aqui', this.detalle_puesto);
    };
    DetallePuestoPage.prototype.goToPostulado = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__postulados_postulados__["a" /* PostuladosPage */]);
    };
    DetallePuestoPage.prototype.postulado = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Gracias por postularse',
            subTitle: 'Recibiras informacion de este puesto',
            buttons: [
                {
                    text: 'OK',
                    handler: function (data) {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        this.serviceProvider.setPostularsePuesto(this.detalle_puesto.puestoid).subscribe(function (x) {
            alert.present();
        });
    };
    DetallePuestoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-detalle-puesto',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detalle-puesto/detalle-puesto.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <ion-title>Empleos</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n  <ion-badge color="celeste" style="margin-top: 15px; width: 100%;height: 45px; border-radius: 0px !important;">\n    <p style="margin: 10px 0 !important;font-size: 1.3em;"><strong>{{detalle_puesto.titulo}}</strong></p>\n  </ion-badge>\n    <ion-card>\n      <ion-card-header>\n        <p style="padding-bottom: 10px !important; color: #999999; border-bottom: 2px solid lightgray;"><strong>{{detalle_puesto.titulo}}</strong></p>\n      </ion-card-header>\n      <ion-card-content>\n        <p text-wrap>{{detalle_puesto.detalle}}</p>\n      </ion-card-content>   \n    </ion-card>\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="btnPostularse" (click)="postulado()">\n    <strong>Postularse</strong> \n  </button>\n</ion-footer>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/detalle-puesto/detalle-puesto.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], DetallePuestoPage);
    return DetallePuestoPage;
}());

//# sourceMappingURL=detalle-puesto.js.map

/***/ }),

/***/ 61:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PostuladosPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ver_curriculum_ver_curriculum__ = __webpack_require__(124);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { POSTULADOS } from './../../data/postulados-mok';

var PostuladosPage = /** @class */ (function () {
    function PostuladosPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.postulados = [];
        this.puestoid = navParams.data;
        this.getPostulados();
    }
    PostuladosPage.prototype.getPostulados = function () {
        var _this = this;
        this.services.getPostulados(this.puestoid).subscribe(function (x) {
            _this.postulados = JSON.parse(x["data"]);
        });
    };
    PostuladosPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PostuladosPage');
    };
    PostuladosPage.prototype.goToPerfil = function (data) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__ver_curriculum_ver_curriculum__["a" /* VerCurriculumPage */], data.usuarioid);
    };
    PostuladosPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-postulados',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/postulados/postulados.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Postulados</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n    <ion-list *ngFor="let postulado of postulados">\n        <ion-item (click)="goToPerfil(postulado)">\n          <ion-avatar item-start>\n            <img src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n          </ion-avatar>\n          <h2>{{postulado.nombre}} {{postulado.apellido}}</h2>\n          <p></p>\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/postulados/postulados.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], PostuladosPage);
    return PostuladosPage;
}());

//# sourceMappingURL=postulados.js.map

/***/ }),

/***/ 62:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SelectCategoriesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ultimo_paso_ultimo_paso__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SelectCategoriesPage = /** @class */ (function () {
    function SelectCategoriesPage(navCtrl, navParams, service) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.categories = [];
        this.driver = {};
        this.isCheckboxDisabled = false;
        this.checkedDrivers = [];
        this.completolascats = false;
        this.categoriesSelected = [];
        //console.log(this.service.categorias.length);
        if (this.service.categorias.length > 0) {
            this.categories = this.service.categorias;
        }
        else {
            this.service.getCategories().subscribe(function (x) {
                _this.categories = JSON.parse(x['data']);
                console.log("despues");
            });
        }
    }
    SelectCategoriesPage.prototype.checked = function (driver) {
        console.log('check', driver.checked);
        if (driver.checked === true) {
            this.checkedDrivers.push(driver);
        }
        else if (driver.checked === false) {
            this.checkedDrivers.splice(this.checkedDrivers.indexOf(driver), 1);
        }
        //check for two selected.
        if (this.categories.filter(function (driver) { return driver.checked; }).length === 2) {
            this.isCheckboxDisabled = true;
        }
    };
    SelectCategoriesPage.prototype.selected = function ($event, catid) {
        //console.log('event', $event,catid)
        if ($event._value) {
            if (this.categoriesSelected.length < 3) {
                this.categoriesSelected.push(catid);
            }
            else {
                this.categoriesSelected.push(catid);
                alert("Listo! Ya elegiste las 4 categorias necesarias. Si queres cambiarlas tendras que deseleccionar alguna categoria.");
                //deshabilitar todo el resto
                this.completolascats = true;
            }
        }
        else {
            var index = this.categoriesSelected.indexOf(catid);
            this.categoriesSelected.splice(index, 1);
        }
        console.log("mi array", this.categoriesSelected);
    };
    SelectCategoriesPage.prototype.guardarCategorias = function () {
        this.service.setGuardarCategoriasFav(this.categoriesSelected[0], this.categoriesSelected[1], this.categoriesSelected[2], this.categoriesSelected[3]).subscribe(function (x) {
        });
    };
    SelectCategoriesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCategoriesPage');
    };
    SelectCategoriesPage.prototype.goToTerminos = function () {
        this.guardarCategorias();
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__ultimo_paso_ultimo_paso__["a" /* UltimoPasoPage */]);
    };
    SelectCategoriesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["m" /* Component */])({
            selector: 'page-select-categories',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/select-categories/select-categories.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      <img class="logo_nav" src="../../assets/imgs/logo.svg">\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content no-padding>\n<!--   <ion-row class="category-info">\n    <img class="img" src="../../assets/imgs/select-categories/fondo-categorias.jpg" style="width: 100%; height: 190px !important;">\n  </ion-row> -->\n  <ion-row class="telefonos-header">\n    <ion-col col-12 text-center style="padding-top: 45px;">\n      <h1 class="tel-item">CATEGORIAS RANTO</h1>\n    </ion-col>\n    <ion-col col-12 text-center>\n      <p class="tel-item">Elige al menos 4 categorias</p>\n    </ion-col>\n  </ion-row>\n  <ion-list *ngIf="categories">\n    <ion-item *ngFor="let cat of categories">\n     <ion-label>{{cat.nombre}}</ion-label>\n     <ion-checkbox color="secondary" (ionChange)="selected($event,cat.categoriaid)" item-right></ion-checkbox>\n   </ion-item>\n  </ion-list>\n</ion-content>\n<ion-footer>\n  <button style="margin: 0px !important; height: 50px;" ion-button full color="violeta" (click)="goToTerminos()" [disabled]="!completolascats">Continuar</button>\n</ion-footer>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/select-categories/select-categories.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], SelectCategoriesPage);
    return SelectCategoriesPage;
}());

//# sourceMappingURL=select-categories.js.map

/***/ }),

/***/ 63:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ListVouchersPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__create_voucher_create_voucher__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the ListVouchersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ListVouchersPage = /** @class */ (function () {
    function ListVouchersPage(navCtrl, navParams, service) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.service = service;
        this.vouchers = [];
        this.tiendaid = this.navParams.data;
        this.getVouchers();
    }
    ListVouchersPage.prototype.getVouchers = function () {
        var _this = this;
        this.service.getVouchersPorTienda(this.tiendaid).subscribe(function (x) {
            _this.vouchers = JSON.parse(x["data"]);
        });
    };
    ListVouchersPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ListVouchersPage');
    };
    ListVouchersPage.prototype.goToCreate = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__create_voucher_create_voucher__["a" /* CreateVoucherPage */], this.tiendaid);
    };
    ListVouchersPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-list-vouchers',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-vouchers/list-vouchers.html"*/'<!--\n  Generated template for the ListVouchersPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>list-vouchers</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n    <button ion-button full color="primary" (click)="goToCreate()">Crear nuevo Voucher</button>\n  </ion-badge>\n  <ion-card>\n    <ion-card-header>\n      Mis Vouchers Publicados\n    </ion-card-header>\n    <ion-card-content>\n      <ion-list *ngFor="let vouch of vouchers">\n        <ion-item text-wrap>\n          <h1>{{vouch.titulo}}</h1>\n          <p>{{vouch.detalle}}</p>\n          <p>Publicado: {{vouch.fechapublicacion}}</p>\n          <p>Vence: {{vouch.fechavencimiento}}</p>\n          <p>Cantidad: {{vouch.cantidad}}</p>\n         \n        </ion-item>\n      </ion-list>\n    </ion-card-content>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/list-vouchers/list-vouchers.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], ListVouchersPage);
    return ListVouchersPage;
}());

//# sourceMappingURL=list-vouchers.js.map

/***/ }),

/***/ 64:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TrabajoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__create_clasificado_create_clasificado__ = __webpack_require__(197);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__detail_clasificado_detail_clasificado__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__detalle_puesto_detalle_puesto__ = __webpack_require__(60);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__search_result_trabajo_search_result_trabajo__ = __webpack_require__(131);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



//import { CLASIFICADOS } from './../../data/clasificados-mok';




//import { TRABAJOS } from './../../data/trabajos-mok';
var TrabajoPage = /** @class */ (function () {
    function TrabajoPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.showList = false;
        this.puestos = [];
        this.clasificados = [];
        this.expanded1 = false;
        this.expanded2 = false;
        this.visible1 = false;
        this.visible2 = false;
        //this.getClasificados();
    }
    TrabajoPage.prototype.getPuestos = function () {
        var _this = this;
        this.services.getPuestosyClasificados().subscribe(function (data) {
            console.log(JSON.parse(data.data)["puestos"]);
            console.log(JSON.parse(data.data)["clasificados"]);
            _this.puestos = JSON.parse(data.data)["puestos"];
            _this.clasificados = JSON.parse(data.data)["clasificados"];
            //this.puestos = data;
        });
    };
    /*   getClasificados(){
        this.services.getClasificados().subscribe((data)=>{
          this.clasificados = data;
        })
      } */
    TrabajoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TrabajoPage');
    };
    TrabajoPage.prototype.ionViewWillEnter = function () {
        this.getPuestos();
    };
    TrabajoPage.prototype.detallePuesto = function (puesto) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__detalle_puesto_detalle_puesto__["a" /* DetallePuestoPage */], puesto);
    };
    TrabajoPage.prototype.detalleClasificado = function (puesto) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__detail_clasificado_detail_clasificado__["a" /* DetailClasificadoPage */], puesto);
    };
    TrabajoPage.prototype.goToCreateClas = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__create_clasificado_create_clasificado__["a" /* CreateClasificadoPage */]);
    };
    TrabajoPage.prototype.goToBusqueda = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_6__search_result_trabajo_search_result_trabajo__["a" /* SearchResultTrabajoPage */], item);
    };
    TrabajoPage.prototype.expandItem = function (x) {
        switch (x) {
            case 1:
                this.expanded1 = !this.expanded1;
                this.visible1 = !this.visible1;
                break;
            case 2:
                this.expanded2 = !this.expanded2;
                this.visible2 = !this.visible2;
                break;
        }
    };
    TrabajoPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        var _this = this;
        // set val to the value of the searchbar
        var val = ev.target.value;
        //console.log("bus");
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.length > 3) {
            //console.log("bus", val);
            this.services.buscarEmpleosAuto(val).subscribe(function (res) {
                //console.log(res);
                _this.items = JSON.parse(res);
            });
        }
        else {
            this.items = [];
        }
    };
    TrabajoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-trabajo',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/trabajo/trabajo.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon color="iconMenu" name="menu"></ion-icon>\n    </button>\n    <ion-title>Clasificados</ion-title>\n  </ion-navbar>\n  <ion-searchbar placeholder="Buscar" style="background-color: #ffffff !important;" color="navbar" [(ngModel)]="txtbusqueda" (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list *ngIf="items">\n    <ion-item (click)="goToBusqueda(txtbusqueda)" *ngIf="txtbusqueda">\n      {{ txtbusqueda }}\n    </ion-item>\n    <ion-item *ngFor="let item of items" (click)="goToBusqueda(item)">\n      {{ item }}\n    </ion-item>\n  </ion-list>\n</ion-header>\n\n\n<ion-content class=" cards-bg" no-padding>\n  <img src="../../assets/imgs/trabajo/header.jpg" alt="">\n  <ion-badge color="light" style="width: 100%; border-radius: 0px !important;">\n    <button class="crear-clasificado" ion-button full color="primary" (click)="goToCreateClas()">Crear Clasificado</button>\n  </ion-badge>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(1)">\n    Empleos\n    <ion-icon [name]="visible1 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-card *ngIf="expanded1" class="cards-list-demo">\n    <ion-card-header>\n      <h3>Empleos</h3>\n    </ion-card-header>\n    <ion-list *ngFor="let puesto of puestos">\n      <button ion-item (click)="detallePuesto(puesto)">\n        <ion-icon name="contact" item-start></ion-icon>\n        {{puesto.titulo}}\n      </button>\n    </ion-list>\n  </ion-card>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(2)">\n    Clasificados\n    <ion-icon [name]="visible2 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-card *ngIf="expanded2" class="cards-list-demo">\n    <ion-card-header>\n      <h3>\n        Clasificados\n      </h3>\n    </ion-card-header>\n    <ion-list *ngFor="let clas of clasificados">\n      <button ion-item (click)="detalleClasificado(clas)">\n        <ion-icon name="clipboard" item-start></ion-icon>\n        {{clas.titulo}}\n      </button>\n    </ion-list>\n  </ion-card>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/trabajo/trabajo.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */]])
    ], TrabajoPage);
    return TrabajoPage;
}());

//# sourceMappingURL=trabajo.js.map

/***/ }),

/***/ 65:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__search_result_search_result__ = __webpack_require__(132);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SearchPage = /** @class */ (function () {
    function SearchPage(navCtrl, navParams, serviceProvider) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.serviceProvider = serviceProvider;
        this.showList = false;
    }
    SearchPage.prototype.goToBusqueda = function (item) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__search_result_search_result__["a" /* SearchResultPage */], item);
    };
    SearchPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        var _this = this;
        // set val to the value of the searchbar
        var val = ev.target.value;
        //console.log("bus");
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '' && val.length > 3) {
            //console.log("bus", val);
            this.serviceProvider.buscarProductosAuto(val).subscribe(function (res) {
                //console.log(res);
                _this.items = JSON.parse(res);
            });
        }
        else {
            this.items = [];
        }
    };
    SearchPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchPage');
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search/search.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon color="iconMenu" name="menu"></ion-icon>\n    </button>\n    <ion-title>Buscar</ion-title>\n  </ion-navbar>\n  <ion-searchbar placeholder="Buscar" style="background-color: #ffffff !important;" [(ngModel)]="txtbusqueda" (ionInput)="getItems($event)"></ion-searchbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n        <ion-item (click)="goToBusqueda(txtbusqueda)" *ngIf="txtbusqueda">\n            {{ txtbusqueda }}\n          </ion-item>\n        <ion-item *ngFor="let item of items" (click)="goToBusqueda(item)">\n          {{ item }}\n        </ion-item>\n      </ion-list>\n</ion-content>\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/search/search.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], SearchPage);
    return SearchPage;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 66:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VoucherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__int_voucher_int_voucher__ = __webpack_require__(99);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(3);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { VOUCHERS } from '../../data/vouchers-mok';
var VoucherPage = /** @class */ (function () {
    function VoucherPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.icons = "camera";
        this.vouchers = [];
        this.vouchersusados = [];
        this.voucherssinusar = [];
        this.getVouchers();
    }
    VoucherPage.prototype.getVouchers = function () {
        var _this = this;
        this.services.getMisVouchers().subscribe(function (data) {
            console.log(data['data']);
            _this.vouchers = JSON.parse(data['data']);
            _this.vouchersusados = _this.vouchers.filter(function (x) { return x.usado == 1; });
            _this.voucherssinusar = _this.vouchers.filter(function (x) { return x.usado == 0; });
        });
    };
    VoucherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad VoucherPage');
    };
    VoucherPage.prototype.goToIntVoucher = function (voucher) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_1__int_voucher_int_voucher__["a" /* IntVoucherPage */], voucher);
    };
    VoucherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_2__angular_core__["m" /* Component */])({
            selector: 'page-voucher',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/voucher/voucher.html"*/'<ion-header>\n  <ion-navbar color="navbar">\n    <button ion-button menuToggle>\n      <ion-icon color="iconMenu" name="menu"></ion-icon>\n    </button>\n    <ion-title>Voucher</ion-title>\n  </ion-navbar>\n  <div padding>\n    <ion-segment [(ngModel)]="icons" color="violeta">\n      <ion-segment-button value="camera">\n        Mis Vouchers\n      </ion-segment-button>\n      <ion-segment-button value="bookmark">\n        Vouchers Usados\n      </ion-segment-button>\n    </ion-segment>\n  </div>\n</ion-header>\n\n<ion-content padding>\n\n\n  <div [ngSwitch]="icons">\n\n    <ion-list *ngSwitchCase="\'camera\'">\n\n      <voucher></voucher>\n\n      <ion-item *ngFor="let voucher of voucherssinusar" (click)="goToIntVoucher(voucher)">\n        <h3 class="voucher-titulo">{{voucher.titulo}}</h3>\n        <p text-wrap>{{voucher.detalle}}</p>\n        <p class="vencimiento">Vence en</p>\n        <p class="vencimiento">4 horas 32 minutos</p>\n      </ion-item>\n\n    </ion-list>\n\n    <ion-list class="voucher-info" *ngSwitchCase="\'bookmark\'">\n      <ion-item *ngFor="let voucher of vouchersusados" (click)="goToIntVoucher(voucher)">\n        <h3>{{voucher.titulo}}</h3>\n        <p text-wrap>{{voucher.detalle}}</p>\n      </ion-item>\n    </ion-list>\n  </div>\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/voucher/voucher.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_0__providers_services_services__["a" /* ServicesProvider */]])
    ], VoucherPage);
    return VoucherPage;
}());

//# sourceMappingURL=voucher.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CreateVoucherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__list_vouchers_list_vouchers__ = __webpack_require__(63);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var CreateVoucherPage = /** @class */ (function () {
    function CreateVoucherPage(toastCtrl, navCtrl, navParams, alertCtrl, service) {
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.service = service;
        this.showMsgError = false;
        this.msgError = "";
        this.tiendaid = navParams.data;
    }
    CreateVoucherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CreateVoucherPage');
    };
    CreateVoucherPage.prototype.crearVoucher = function () {
        var _this = this;
        if (this.validacion()) {
            this.service.crearVocuher(this.tiendaid, this.titulo, this.detalle, this.fechavencimiento, this.cantidad).subscribe(function (x) {
                _this.toastExito();
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__list_vouchers_list_vouchers__["a" /* ListVouchersPage */], _this.tiendaid);
            });
        }
        else {
            //msgerror	
            this.showMsgError = true;
            this.toastError();
        }
    };
    CreateVoucherPage.prototype.validacion = function () {
        var ret = true;
        var msg = "";
        if (this.titulo == "") {
            ret = false;
            msg += "Debe completar el titulo";
        }
        if (this.detalle == "") {
            ret = false;
            msg += "Debe completar el detalle";
        }
        if (!this.fechavencimiento) {
            ret = false;
            msg += "Debe completar la fecha de vencimiento";
        }
        if (this.cantidad == 0) {
            ret = false;
            msg += "Debe completar la cantidad";
        }
        this.msgError = msg;
        return ret;
    };
    CreateVoucherPage.prototype.toastExito = function () {
        var toast = this.toastCtrl.create({
            message: 'Se ha guardado con exito!',
            duration: 2000,
            position: 'top',
            cssClass: 'toastExito'
        });
        toast.onDidDismiss(function () {
        });
        toast.present();
    };
    CreateVoucherPage.prototype.toastError = function () {
        var toast = this.toastCtrl.create({
            message: this.msgError,
            showCloseButton: true,
            closeButtonText: "X",
            duration: 5000,
            position: 'top',
            cssClass: 'toastError'
        });
        toast.onDidDismiss(function () {
            console.log('Dismissed toast');
        });
        toast.present();
    };
    CreateVoucherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-create-voucher',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-voucher/create-voucher.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Create Voucher</ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n    <ion-list>\n    \n    <ion-item>\n    <ion-label floating>Titulo</ion-label>\n    <ion-input type="text" clearInput [(ngModel)]="titulo"></ion-input>\n    </ion-item>\n    \n    <ion-item>\n    <ion-label floating>Descripcion</ion-label>\n    <ion-textarea type="text" [(ngModel)]="detalle"></ion-textarea>\n    </ion-item>\n    \n    <ion-item>\n    <ion-label floating>Fecha vencimiento</ion-label>\n    <ion-datetime displayFormat="DD/MM/YYYY" [(ngModel)]="fechavencimiento"></ion-datetime>\n    </ion-item>\n    \n    <ion-item>\n      <ion-label floating>Cantidad</ion-label>\n      <ion-input type="text" [(ngModel)]="cantidad"></ion-input>\n    </ion-item>\n    \n    </ion-list>\n    \n    <div padding>\n      <button ion-button block (click)="crearVoucher()">Crear</button>\n    </div>\n   </ion-content>\n\n'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/create-voucher/create-voucher.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_2__providers_services_services__["a" /* ServicesProvider */]])
    ], CreateVoucherPage);
    return CreateVoucherPage;
}());

//# sourceMappingURL=create-voucher.js.map

/***/ }),

/***/ 98:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__providers_services_services__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__all_categories_all_categories__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__perfil_perfil__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_storage__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__login_login__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__categorias_categorias__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__interna_prod_interna_prod__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__int_voucher_int_voucher__ = __webpack_require__(99);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










//import { PRODUCTOS } from '../../data/listProducts-mok';

//import { VOUCHERS } from '../../data/vouchers-mok';

/**
 * Generated class for the SeccionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, navParams, modalCtrl, app, service, storage, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.modalCtrl = modalCtrl;
        this.app = app;
        this.service = service;
        this.storage = storage;
        this.loadingCtrl = loadingCtrl;
        this.expanded1 = false;
        this.expanded2 = false;
        this.expanded3 = false;
        this.visible1 = false;
        this.visible2 = false;
        this.visible3 = false;
        this.products = [];
        this.vouchers = [];
        this.lista1 = [];
        this.lista2 = [];
        this.lista3 = [];
        this.ultProd = [];
        this.urlImg = 'http://ctrlztest.com.ar/ranto/apirest/upload/';
        this.fbId = this.service.fbIdUser ? this.service.fbIdUser : false;
        this.urlImgFb = "http://graph.facebook.com/" + this.fbId + "/picture?type=square";
        this.presentLoadingDefault();
        //this.getProducts();
        this.getVouchers();
        this.getEventos();
        this.getUltimosSubidos();
        this.getMisCategorias();
        this.setUserData();
    }
    HomePage.prototype.presentLoadingDefault = function () {
        var loading = this.loadingCtrl.create({
            content: 'Espere por favor...'
        });
        loading.present();
        setTimeout(function () {
            loading.dismiss();
        }, 3000);
    };
    HomePage.prototype.setUserData = function () {
        var _this = this;
        console.log('aqui', this.service._usuario);
        var x = Object.keys(this.service._usuario);
        if (x.length == 0) {
            //console.log('aqui2', this.service._usuario)
            this.storage.get("_uid_").then(function (x) {
                console.log(x);
                _this.service.getUserporid(x).subscribe(function (asd) {
                    _this.service._usuario = JSON.parse(asd['data'])[0];
                    //console.log('asd', this.service._usuario[0])
                    _this.localidad = _this.service._usuario.localidad;
                });
            });
        }
        else {
            this.localidad = this.service._usuario.localidad;
        }
    };
    HomePage.prototype.getMisCategorias = function () {
        var _this = this;
        this.service.getMisCategorias().subscribe(function (x) {
            _this.miscategorias = JSON.parse(x['data']);
            //console.log('mis categorias',JSON.parse(x['data']));    
        });
    };
    HomePage.prototype.getUltimosSubidos = function () {
        var _this = this;
        this.service.getUltimosSubidos().subscribe(function (x) {
            _this.ultProd = JSON.parse(x['data']);
            console.log('ultProd', _this.ultProd);
        });
    };
    HomePage.prototype.getVouchers = function () {
        var _this = this;
        this.service.getMisVouchers().subscribe(function (x) {
            _this.vouchers = JSON.parse(x['data']);
            //console.log('voucher',this.vouchers);
        });
    };
    HomePage.prototype.getEventos = function () {
        var _this = this;
        this.service.getEventos().subscribe(function (x) {
            //console.log('eventos',JSON.parse(x['data']))
            _this.eventos = JSON.parse(x['data']);
            _this.eventos.map(function (x) { return x.imgpath = (_this.urlImg + x.imgpath); });
        });
    };
    HomePage.prototype.expandItem = function (x) {
        switch (x) {
            case 1:
                this.expanded1 = !this.expanded1;
                this.visible1 = !this.visible1;
                break;
            case 2:
                this.expanded2 = !this.expanded2;
                this.visible2 = !this.visible2;
                break;
            case 3:
                this.expanded3 = !this.expanded3;
                this.visible3 = !this.visible3;
                break;
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.presentModal = function (page) {
        var modal = this.modalCtrl.create(page);
        modal.present();
    };
    HomePage.prototype.goToCategories = function (categoriaid) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__categorias_categorias__["a" /* CategoriasPage */], categoriaid);
    };
    HomePage.prototype.goToAllCategories = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__all_categories_all_categories__["a" /* AllCategoriesPage */]);
    };
    HomePage.prototype.goToPerfil = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__perfil_perfil__["a" /* PerfilPage */]);
    };
    HomePage.prototype.logoutme = function () {
        //this.navCtrl.push(WelcomePage);
        this.app.getRootNav().setRoot(__WEBPACK_IMPORTED_MODULE_7__login_login__["a" /* LoginPage */], {});
    };
    HomePage.prototype.goToCat = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_8__categorias_categorias__["a" /* CategoriasPage */]);
    };
    HomePage.prototype.goToIntProd = function (product) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_9__interna_prod_interna_prod__["a" /* InternaProdPage */], product);
    };
    HomePage.prototype.goToIntVoucher = function (voucher) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_10__int_voucher_int_voucher__["a" /* IntVoucherPage */], voucher);
    };
    HomePage.prototype.goToInternaEvento = function (evento) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_0__int_evento_int_evento__["a" /* IntEventoPage */], evento);
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_4__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar color="navbar" hideBackButton no-border-bottom>\n    <ion-row>\n      <ion-col>\n        <button float-left ion-button menuToggle>\n          <ion-icon name="menu" color="iconMenu"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col style="align-items: center !important;">\n        <img class="logo_nav" src="../../assets/imgs/logo.svg">\n      </ion-col>\n      <ion-col>\n        <ion-avatar (click)="goToPerfil()">\n          <img *ngIf="fbId" float-right style="max-width: 40% !important; border-radius: 20px;" src="urlImgFb">\n          <img float-right style="max-width: 40% !important; border-radius: 20px;" src="https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg">\n        </ion-avatar>\n      </ion-col>\n    </ion-row>\n  </ion-navbar>\n  <ion-toolbar no-border-top color="navbar" style="padding: 0px !important;">\n    <ion-segment [(ngModel)]="home">\n      <ion-segment-button value="value0" (click)="goToAllCategories()">\n        <ion-icon name="apps"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button *ngFor="let cat of miscategorias" value="value{{cat.categoriaid}}" (click)="goToCategories(cat.categoriaid)">\n        <img src="http://ctrlztest.com.ar/ranto/apirest/{{cat.icono}}" style="width: 7vw; margin-top: 9px;" alt="">\n      </ion-segment-button>\n     <!--  <ion-segment-button value="value2" (click)="goToCategories()">\n        <ion-icon name="car"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="value3" (click)="goToCategories()">\n        <ion-icon name="briefcase"></ion-icon>\n      </ion-segment-button>\n      <ion-segment-button value="value4" (click)="goToCategories()">\n        <ion-icon name="umbrella"></ion-icon>\n      </ion-segment-button> -->\n    </ion-segment>\n  </ion-toolbar>\n</ion-header>\n\n<ion-content>\n  <ion-row justify-content-center>\n    <ion-col style="text-align: center;">\n      <img src="../../assets/imgs/home/bienvenidos.jpg">\n    </ion-col>\n  </ion-row>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(1)">\n    Canjeá tus vouchers\n    <ion-icon [name]="visible1 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-slides style="height: 250px;" *ngIf="expanded1" loop="false" slidesPerView="1.5">\n      <ion-slide *ngFor="let vouch of vouchers">\n        <ion-card (click)="goToIntVoucher(vouch)">\n          <img src="../../assets/imgs/home/voucher.png">\n          <ion-card-title>\n            <h4>{{vouch.titulo}}</h4>\n          </ion-card-title>\n          <ion-card-content>\n            <p text-wrap>{{vouch.detalle}}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-slide>\n    </ion-slides>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(2)">\n    Hoy en {{localidad}}\n    <ion-icon [name]="visible2 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-slides style="height: 250px;" *ngIf="expanded2" loop="false" slidesPerView="1.5">\n      <ion-slide *ngFor="let event of eventos">\n        <ion-card (click)="goToInternaEvento(event)">\n          <img src="{{event.imgpath}}" alt="Imagen Vouchers">\n          <ion-card-title>\n            <h4>{{event.titulo}}</h4>\n          </ion-card-title>\n          <ion-card-content>\n            <p text-wrap>{{event.detalle}}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-slide>\n    </ion-slides>\n  <button class="buttonHome" ion-button full color="celeste" icon-end (click)="expandItem(3)">\n    Últimos articulos\n    <ion-icon [name]="visible3 ? \'arrow-down\' : \'arrow-forward\'"></ion-icon>\n  </button>\n  <ion-slides style="height: 300px;" *ngIf="expanded3" loop="false" slidesPerView="1.5">\n      <ion-slide *ngFor="let prod of ultProd">\n          <ion-card (click)="goToIntProd(prod)">\n            <img src="http://ctrlztest.com.ar/ranto/apirest/{{prod.imagenes[0]}}" alt="Imagen Vouchers">\n            <ion-card-title>\n              <h4>{{prod.nombre}}</h4>\n            </ion-card-title>\n            <ion-card-content>\n              <p text-wrap>${{prod.precio}}</p>\n            </ion-card-content>\n          </ion-card>\n        </ion-slide>\n     <!--  <ion-slide *ngFor="let prod of ultProd">\n        <ion-card (click)="goToIntProd(prod)">\n          <ion-slides>\n            <ion-slide *ngFor="let img of prod.imagenes">\n              <img style="height: 105px;" src="http://ctrlztest.com.ar/ranto/apirest/{{img}}" alt="imagen producto">\n            </ion-slide>\n          </ion-slides>\n          <ion-card-title>\n            <h4>{{prod.nombre}}</h4>\n          </ion-card-title>\n          <ion-card-content>\n            <p>{{prod.precio}}</p>\n            <p text-wrap>{{prod.detalle}}</p>\n          </ion-card-content>\n        </ion-card>\n      </ion-slide> -->\n    </ion-slides>\n  <!-- <button ion-button full color="celeste" (click)="expandItem()">Mis Vouchers</button> -->\n</ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/home/home.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5_ionic_angular__["j" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["k" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["h" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["b" /* App */],
            __WEBPACK_IMPORTED_MODULE_1__providers_services_services__["a" /* ServicesProvider */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_storage__["b" /* Storage */],
            __WEBPACK_IMPORTED_MODULE_5_ionic_angular__["g" /* LoadingController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 99:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IntVoucherPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__int_tienda_int_tienda__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_services_services__ = __webpack_require__(4);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IntVoucherPage = /** @class */ (function () {
    function IntVoucherPage(navCtrl, navParams, services) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.services = services;
        this.dataVoucher = this.navParams.data;
    }
    IntVoucherPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad IntVoucherPage');
        console.log('datavoucher', this.dataVoucher);
    };
    IntVoucherPage.prototype.goToIntTienda = function (tienda) {
        console.log("datatienda", tienda);
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__int_tienda_int_tienda__["a" /* IntTiendaPage */], { data: [tienda] });
    };
    IntVoucherPage.prototype.verCodigo = function () {
        var _this = this;
        this.services.usarVoucher(this.dataVoucher.voucherid).subscribe(function (x) {
            _this.dataVoucher.codigo = JSON.parse(x["data"]);
        });
    };
    IntVoucherPage.prototype.eliminarVoucher = function () {
        var _this = this;
        this.services.borrarVoucher(this.dataVoucher.voucherid).subscribe(function (data) {
            _this.navCtrl.pop();
        });
    };
    IntVoucherPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-int-voucher',template:/*ion-inline-start:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-voucher/int-voucher.html"*/'<ion-header>\n    <ion-navbar>\n      <ion-title>Voucher</ion-title>\n    </ion-navbar>\n   </ion-header>\n   \n   <ion-content>\n   <ion-row class="content" justify-content-center no-padding>\n    <voucher></voucher>\n    <ion-row style="margin-top:10px;">\n        <ion-item style="background: transparent;">\n          <ion-col>\n            <h3 class="voucher-titulo">{{dataVoucher.titulo}}</h3>\n            <p class="vencimiento">Vence en</p>\n            <p class="vencimiento">4 horas 32 minutos</p>\n          </ion-col>\n        </ion-item>\n      </ion-row>\n    </ion-row>\n   <ion-grid style="padding: 0px 16px !important">\n      <ion-row style="padding-top: 10px;">\n        <ion-col>\n          <ion-item>\n            <ion-icon name="desktop" item-start></ion-icon>\n            {{dataVoucher.nombre}} <p (click)="goToIntTienda(dataVoucher.dataTienda)"><a style="font-size: 1em;">Ver\n                perfil tienda</a></p>\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-icon name="pin" item-start></ion-icon>\n            {{dataVoucher.direccion}}\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-col>\n          <ion-item>\n            <ion-icon name="call" item-start></ion-icon>\n            {{dataVoucher.telefono}}\n          </ion-item>\n        </ion-col>\n      </ion-row>\n      <ion-row>\n        <ion-item>\n          <ion-col>\n            <p float-left>Codigo del Voucher</p>\n          </ion-col>\n          <ion-col>\n          </ion-col>\n          <ion-col>\n            <h4 float-right>{{dataVoucher.codigo}}</h4>\n          </ion-col>\n        </ion-item>\n      </ion-row>\n      <ion-row>\n        <ion-item>\n          <ion-col>\n            <p>Descripción</p>\n          </ion-col>\n          <ion-col style="text-align: center !important;" text-wrap>\n            <h4>{{dataVoucher.detalle}}</h4>\n          </ion-col>\n        </ion-item>\n      </ion-row>\n    </ion-grid>\n    <ion-row>\n      <ion-item style="text-align: center" no-lines>\n        <ion-col>\n          <!-- <ion-icon  name="finger-print"></ion-icon> -->\n          <button class="green-button" (click)="verCodigo()">Usar</button>\n        </ion-col>\n        <ion-col>\n          <!-- <ion-icon name="trash"></ion-icon> -->\n          <button class="red-button" (click)="eliminarVoucher()">Eliminar</button>\n        </ion-col>\n      </ion-item>\n    </ion-row>\n   </ion-content>'/*ion-inline-end:"/home/rodrigo/tutorialIonic/ranto/github/ranto/src/pages/int-voucher/int-voucher.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["k" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__providers_services_services__["a" /* ServicesProvider */]])
    ], IntVoucherPage);
    return IntVoucherPage;
}());

//# sourceMappingURL=int-voucher.js.map

/***/ })

},[248]);
//# sourceMappingURL=main.js.map