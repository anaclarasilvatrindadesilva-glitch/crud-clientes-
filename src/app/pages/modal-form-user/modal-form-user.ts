import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-form-user',
  standalone: false,
  templateUrl: './modal-form-user.html',
  styleUrl: './modal-form-user.scss',
})
export class ModalFormUser {
  formUser: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModalFormUser>,
    private formBuilder: FormBuilder){}

    // incializar o buildForm
    ngOninit(){
      this.buildForm();
    }

    buildForm(){
      this.formUser = this.formBuilder.group({
        name: [null, [Validators.required, Validators.minLength(2)]],
        cpf: [null, [Validators.required, Validators.pattern(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)]],
        fone: [null, [Validators.required, Validators.pattern('^\\(?[1-9]{2}\\)? ?9[0-9]{4}-?[0-9]{4}$')]],
        email: [null, [Validators.required, Validators.email]],
        cep: [null, [Validators.required, Validators.pattern(/^\d{5}-\d{3}$/)]],
        rua: [null, [Validators.required, Validators.minLength(2)]],
        num: [null, [Validators.required, Validators.minLength(2)]],
        compl: [null, [Validators.required, Validators.minLength(2)]],
        bairro: [null, [Validators.required, Validators.minLength(2)]],
        cidade: [null, [Validators.required, Validators.minLength(2)]],
        estado: [''],
        status: [''],
      });
    }
}






