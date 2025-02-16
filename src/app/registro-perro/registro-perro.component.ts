import { Component, OnInit } from '@angular/core';
import {AlertController, IonicModule} from "@ionic/angular";
import {Router, RouterLink} from "@angular/router";
import {addIcons} from "ionicons";
import {arrowForwardOutline, camera, imageOutline} from "ionicons/icons";
import {RegistroService} from "../1-Servicios/registro.service";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";

@Component({
    selector: 'app-registro-perro',
    templateUrl: './registro-perro.component.html',
    styleUrls: ['./registro-perro.component.scss'],
    standalone: true,
  imports: [
    IonicModule,
    RouterLink,
    FormsModule,
    NgForOf
  ]
})
export class RegistroPerroComponent  implements OnInit {


  isUrlModalOpen: boolean = false;
  imageURL: string = '';
  mostrarErrores: boolean = false;

  razas: string[] = [
    'Airedale Terrier', 'Akita', 'Akita Americano', 'American Bully', 'American Pit Bull Terrier',
    'American Staffordshire Terrier', 'Azawakh', 'Barbet', 'Basenji', 'Basset Azul de Gascuña',
    'Basset Hound', 'Beagle', 'Beauceron', 'Bedlington Terrier', 'Bichón Frisé', 'Bichón Habanero',
    'Bichón Maltés', 'Billy', 'Bloodhound', 'Bóxer', 'Boyero Appenzeller', 'Boyero Australiano',
    'Boyero de Berna', 'Boyero de Entlebuch', 'Braco Alemán de Pelo Corto', 'Braco Alemán de Pelo Duro',
    'Braco de Auvernia', 'Braco de Saint-Germain', 'Braco Francés', 'Braco Italiano', 'Bull Terrier',
    'Bull Terrier Miniatura', 'Bulldog Americano', 'Bulldog Francés', 'Bulldog Inglés', 'Bullmastiff',
    'Cairn Terrier', 'Cane Corso', 'Caniche', 'Carlino (Pug)', 'Cavalier King Charles Spaniel',
    'Chesapeake Bay Retriever', 'Chihuahua', 'Chin Japonés', 'Chow Chow', 'Cirneco del Etna',
    'Clumber Spaniel', 'Cocker Spaniel Americano', 'Cocker Spaniel Inglés', 'Collie',
    'Coonhound Negro y Fuego', 'Coonhound Redbone', 'Corgi Galés de Cardigan', 'Corgi Galés de Pembroke',
    'Coton de Tuléar', 'Dachshund (Teckel)', 'Dálmata', 'Dandie Dinmont Terrier', 'Dingo Australiano',
    'Dogo Alemán (Gran Danés)', 'Dogo Argentino', 'Dogo de Burdeos', 'Dóberman', 'Elkhound Noruego',
    'Eurasier', 'Fila Brasileño', 'Fox Terrier de Pelo Liso', 'Fox Terrier de Pelo Duro',
    'Foxhound Americano', 'Foxhound Inglés', 'Galgo Afgano', 'Galgo Español', 'Galgo Italiano',
    'Golden Retriever', 'Gordon Setter', 'Gran Pirineo', 'Greyhound (Galgo Inglés)',
    'Grifón Azul de Gascuña', 'Grifón de Bruselas', 'Grifón de Pelo Duro', 'Husky Siberiano',
    'Jack Russell Terrier', 'Keeshond', 'Komondor', 'Kuvasz', 'Labrador Retriever', 'Lagotto Romagnolo',
    'Lhasa Apso', 'Lebrel Escocés (Deerhound)', 'Lebrel Irlandés (Irish Wolfhound)', 'Leonberger',
    'Lowchen', 'Malamute de Alaska', 'Maltés', 'Mastín Español', 'Mastín Napolitano', 'Mastín del Pirineo',
    'Mastín Tibetano', 'Norfolk Terrier', 'Norwich Terrier', 'Otterhound', 'Papillón', 'Pastor Alemán',
    'Pastor Australiano', 'Pastor Belga Malinois', 'Pastor Belga Tervuren', 'Pastor Blanco Suizo',
    'Pastor de Asia Central', 'Pastor de Beauce', 'Pastor de los Pirineos', 'Pastor Ganadero Australiano',
    'Pastor Holandés', 'Pequeño Brabanzón', 'Perdiguero de Burgos', 'Perdiguero Portugués',
    'Perro de Agua Americano', 'Perro de Agua Español', 'Perro de Agua Portugués', 'Perro de Canaan',
    'Perro de Montaña de los Pirineos', 'Perro Esquimal Americano', 'Perro Lobo Checoslovaco',
    'Perro Lobo de Saarloos', 'Pinscher Alemán', 'Pinscher Miniatura', 'Pitbull Terrier',
    'Podenco Andaluz', 'Podenco Canario', 'Podenco Ibicenco', 'Pomerania', 'Presa Canario',
    'Pudelpointer', 'Puli', 'Retriever de Pelo Liso', 'Retriever de Pelo Rizado', 'Ridgeback de Rodesia',
    'Rottweiler', 'Sabueso Español', 'Sabueso Italiano', 'Samoyedo', 'San Bernardo', 'Schipperke',
    'Schnauzer Gigante', 'Schnauzer Mediano', 'Schnauzer Miniatura', 'Setter Gordon', 'Setter Inglés',
    'Setter Irlandés', 'Shar Pei', 'Shiba Inu', 'Shih Tzu', 'Skye Terrier', 'Spaniel Azul Picardo',
    'Spaniel Bretón', 'Spaniel de Campo', 'Spaniel de Sussex', 'Spaniel Francés', 'Spaniel Tibetano',
    'Spinone Italiano', 'Springer Spaniel Galés', 'Springer Spaniel Inglés', 'Staffordshire Bull Terrier',
    'Terranova', 'Terrier Australiano', 'Terrier Escocés', 'Terrier Irlandés', 'Terrier Jack Russell',
    'Terrier Tibetano', 'Tosa Inu', 'Vizsla (Braco Húngaro)', 'Volpino Italiano', 'Weimaraner',
    'West Highland White Terrier', 'Whippet', 'Yorkshire Terrier'
  ];

  constructor(public registroService: RegistroService, private router: Router, private alertController: AlertController) { }

  ngOnInit() {
    addIcons({
      'camera': camera,
      'image-outline': imageOutline,
      'arrow-forward-outline': arrowForwardOutline

    });
  }

  /**
   * ✅ Abre el modal para ingresar la URL de la imagen
   */
  openUrlModal() {
    this.isUrlModalOpen = true;
  }

  addImageFromURL() {
    if (!this.imageURL) {
      alert("❌ La URL ingresada no es válida. Inténtalo de nuevo.");
      return;
    }
    this.registroService.registro.fotoUrl = this.imageURL;
    this.isUrlModalOpen = false;
    this.imageURL = '';
  }

  /**
   * ✅ Elimina la imagen seleccionada
   */
  removeImage() {
    this.registroService.registro.fotoUrl = '';
  }

  /**
   * ✅ Valida y continúa con el registro
   */
  async continuarRegistro() {
    this.mostrarErrores = true;

    // Validar si la foto ha sido añadida
    if (!this.registroService.registro.fotoUrl) {
      const alert = await this.alertController.create({
        header: 'Falta Foto',
        message: '⚠️ Debes añadir una foto del perro antes de continuar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Validar si se ha seleccionado una raza
    if (!this.registroService.registro.raza) {
      const alert = await this.alertController.create({
        header: 'Falta Raza',
        message: '⚠️ Debes seleccionar una raza para continuar.',
        buttons: ['OK']
      });
      await alert.present();
      return;
    }

    // Si ambas validaciones pasan, continuar al siguiente paso
    this.router.navigate(['/registrocualidades']);
  }



}
