import { Component } from '@angular/core';
import { ModalFormUser } from '../modal-form-user/modal-form-user';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-clientes',
  standalone: false,
  templateUrl: './clientes.html',
  styleUrl: './clientes.scss',
})

export class Clientes {

  dataSource: any;
  constructor(private dialog: MatDialog) {}
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

openModalAddUser(){
  this.dialog.open(ModalFormUser, {
    width: '700px',
    height: '400px'
  })

}

}
