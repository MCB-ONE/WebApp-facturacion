import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { finalize, lastValueFrom, Observable, Subject, takeUntil } from 'rxjs';
import  firebase from 'firebase/compat';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit, OnDestroy {

  @Input() file!: File; // Recibe el archivo a subir al servidor
  @Output() completed =  new EventEmitter<string>(); // Flag que indica si la subida de archivo se ha completada

  task!: AngularFireUploadTask; // Task a realizarse en este proceso

  percentage$ !: Observable<number>; // Indicador para visualizar el estado del proceso de subida de archivo

  snapshot$ !: Observable<firebase.storage.UploadTaskSnapshot>; // Contiene datos sobre el estado actual de la tarea de subida de archivo

  downloadURL !: string; // Representa la url del archivo una vez subido al servidor

  private destroy = new Subject<void>(); // Subsripción para cancelar/eliminar el proceso al campiar de pantalla/componente

  constructor(private storage: AngularFireStorage) { }

  ngOnInit(): void {
    this.startUpload();
  }

  ngOnDestroy(): void {
    // Culminar observable
    this.destroy.next();
    this.destroy.complete();
  }

  startUpload(): void {
    /*Método para iniciar la subida de archivos al servidor
    Generar directorio de imagenes a partir del tipo y un número aleatorio para evitar reemplazos
    Ejemplo directorio creado: jpg/832932832.jpg
    */
    const path = `${this.file.type.split('/')[0]}/${Date.now()}_${this.file.name}`;
    const storageRef = this.storage.ref(path);

    this.task = this.storage.upload(path, this.file);
    this.percentage$ = this.task.percentageChanges() as Observable<number>;
    this.snapshot$ = this.task.snapshotChanges() as Observable<firebase.storage.UploadTaskSnapshot>;
    this.snapshot$.pipe(
      takeUntil(this.destroy),
      finalize( async() => {
        const storageRefObservable$ = storageRef.getDownloadURL();
        this.downloadURL = await lastValueFrom(storageRefObservable$);
        this.completed.next(this.downloadURL);
      })
    ).subscribe();
  }

}
