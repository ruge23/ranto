import { CreateCvPage } from './../pages/create-cv/create-cv';
import { UserClasificadoPage } from "./../pages/user-clasificado/user-clasificado";
import { CreateClasificadoPage } from "./../pages/create-clasificado/create-clasificado";
import { CreateProdUserPage } from "./../pages/create-prod-user/create-prod-user";
import { ListProdCatPage } from "./../pages/list-prod-cat/list-prod-cat";
import { DetailClasificadoPage } from "./../pages/detail-clasificado/detail-clasificado";
import { FavoritesPage } from "./../pages/favorites/favorites";
import { CreateVoucherPage } from "./../pages/create-voucher/create-voucher";
import { CreateEmpleoPage } from "./../pages/create-empleo/create-empleo";
import { DetailPuestoComPage } from "./../pages/detail-puesto-com/detail-puesto-com";
import { ListEmpleosPage } from "./../pages/list-empleos/list-empleos";
import { AllCategoriesPage } from "./../pages/all-categories/all-categories";
import { CurriculumPage } from "./../pages/curriculum/curriculum";
import { PerfilPage } from "./../pages/perfil/perfil";
import { SearchPage } from "./../pages/search/search";
import { TabsPage } from "./../tabs/tabs";
import { SelectCategoriesPage } from "./../pages/select-categories/select-categories";
import { BrowserModule } from "@angular/platform-browser";
import { ErrorHandler, NgModule } from "@angular/core";
import { IonicApp, IonicErrorHandler, IonicModule } from "ionic-angular";

import { MyApp } from "./app.component";
import { HomePage } from "../pages/home/home";
import { ListPage } from "../pages/list/list";
import { LoginPage } from "./../pages/login/login";
import { SignupPage } from "../pages/signup/signup";
import { EventosDiaPage } from "./../pages/eventos-dia/eventos-dia";

import { CategoriasPage } from "./../pages/categorias/categorias";
import { InternaProdPage } from "./../pages/interna-prod/interna-prod";
import { MisComerciosPage } from "./../pages/mis-comercios/mis-comercios";
import { ListProdPage } from "./../pages/list-prod/list-prod";
import { CreateProdPage } from "./../pages/create-prod/create-prod";
import { PerfilComercioPage } from "./../pages/perfil-comercio/perfil-comercio";
import { TrabajoPage } from "./../pages/trabajo/trabajo";
import { InternaProdComPage } from "./../pages/interna-prod-com/interna-prod-com";
import { DetallePuestoPage } from "./../pages/detalle-puesto/detalle-puesto";
import { PostuladosPage } from "./../pages/postulados/postulados";

import { MenuPage } from "./../pages/menu/menu";
import { IonicStorageModule } from "@ionic/storage";
import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { HttpModule } from "@angular/http";
import { HttpClientModule } from "@angular/common/http";
import { UltimoPasoPage } from "../pages/ultimo-paso/ultimo-paso";
import { VoucherPage } from "../pages/voucher/voucher";
import { IntVoucherPage } from "../pages/int-voucher/int-voucher";
import { IntTiendaPage } from "../pages/int-tienda/int-tienda";
import { ServicesProvider } from "../providers/services/services";
import { CreateProvider } from "../providers/create/create";
import { MisDatosPage } from "../pages/mis-datos/mis-datos";
import { ConfiguracionPage } from "../pages/configuracion/configuracion";
import { MisPublicacionesPage } from "../pages/mis-publicaciones/mis-publicaciones";
import { SearchResultPage } from "../pages/search-result/search-result";
import { VerCurriculumPage } from "../pages/ver-curriculum/ver-curriculum";
import { ListVouchersPage } from "../pages/list-vouchers/list-vouchers";
import { SearchResultTrabajoPage } from "../pages/search-result-trabajo/search-result-trabajo";
import { VoucherComponent } from "../components/voucher/voucher";
import { ModificarCategoriasPage } from "../pages/modificar-categorias/modificar-categorias";
import { IntEventoPage } from '../pages/int-evento/int-evento';

import { Facebook } from '@ionic-native/facebook';
import { CreateTiendaPage } from '../pages/create-tienda/create-tienda';
import { IntProdUserPage } from '../pages/int-prod-user/int-prod-user';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PerfilPage,
    TabsPage,
    SearchPage,
    EventosDiaPage,
    CategoriasPage,
    InternaProdPage,
    MisComerciosPage,
    PerfilComercioPage,
    IntTiendaPage,
    CreateProdPage,
    ListProdPage,
    TrabajoPage,
    InternaProdComPage,
    DetallePuestoPage,
    PostuladosPage,
    MenuPage,
    SelectCategoriesPage,
    UltimoPasoPage,
    VoucherPage,
    IntVoucherPage,
    CurriculumPage,
    AllCategoriesPage,
    ListEmpleosPage,
    DetailPuestoComPage,
    CreateEmpleoPage,
    CreateVoucherPage,
    FavoritesPage,
    DetailClasificadoPage,
    ListProdCatPage,
    CreateProdUserPage,
    MisDatosPage,
    ConfiguracionPage,
    MisPublicacionesPage,
    SearchResultPage,
    VerCurriculumPage,
    ListVouchersPage,
    CreateClasificadoPage,
    SearchResultTrabajoPage,
    UserClasificadoPage,
    VoucherComponent,
    ModificarCategoriasPage,
    CreateCvPage,
    CreateTiendaPage,
    IntEventoPage,
    IntProdUserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp,{backButtonText: 'Atras'}),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    VoucherComponent,
    MyApp,
    HomePage,
    ListPage,
    LoginPage,
    SignupPage,
    PerfilPage,
    TabsPage,
    SearchPage,
    EventosDiaPage,
    CategoriasPage,
    InternaProdPage,
    MisComerciosPage,
    PerfilComercioPage,
    IntTiendaPage,
    CreateProdPage,
    ListProdPage,
    TrabajoPage,
    InternaProdComPage,
    DetallePuestoPage,
    PostuladosPage,
    MenuPage,
    SelectCategoriesPage,
    UltimoPasoPage,
    VoucherPage,
    IntVoucherPage,
    CurriculumPage,
    AllCategoriesPage,
    ListEmpleosPage,
    DetailPuestoComPage,
    CreateEmpleoPage,
    CreateVoucherPage,
    FavoritesPage,
    DetailClasificadoPage,
    ListProdCatPage,
    CreateProdUserPage,
    MisDatosPage,
    ConfiguracionPage,
    MisPublicacionesPage,
    SearchResultPage,
    CreateClasificadoPage,
    VerCurriculumPage,
    ListVouchersPage,
    SearchResultTrabajoPage,
    UserClasificadoPage,
    ModificarCategoriasPage,
    CreateCvPage,
    CreateTiendaPage,
    IntEventoPage,
    IntProdUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ServicesProvider,
    CreateProvider,
    Camera
  ]
})
export class AppModule {}
