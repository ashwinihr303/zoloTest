import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {SelectItem} from 'primeng/api';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Products';
  errMsg: String = '';
  succMsg: String = '';
  productsList: any[] = [];
  addProductForm: FormGroup;
  fabric :SelectItem[]=[
    {label:'Cotton',value:'Cotton'},
    {label:'Rayon',value:'Rayon'},
    {label:'Naylon',value:'Naylon'},
    {label:'Silk',value:'Silk'},
    {label:'Jute',value:'Jute'},
    {label:'Polyster',value:'Polyster'},
  ];
  manufacturer :SelectItem[]=[
    {label:'Biba',value:'Biba'},
    {label:'Forever 21',value:'Forever 21'},
    {label:'Dressberry',value:'Dressberry'},
    {label:'Saffrass',value:'Saffrass'},
    {label:'Pepe',value:'Pepe'},
    {label:'Ruggers',value:'Ruggers'},

  ];

  constructor(private formBuilder: FormBuilder,
    private HttpClient: HttpClient, public router: Router,
    private ActivatedRoute: ActivatedRoute,
    private modalService:NgbModal) { }
  ngOnInit(): void {
    this.createForm();
    this.getAllProducts();
  }
  private createForm() {
    this.addProductForm = this.formBuilder.group({
      pName: ['', Validators.required],
      model: ['', Validators.required],
      fabric: ['', Validators.required],
      price: ['', Validators.required],
      manufacturer: ['', Validators.required],
      dateOfManufacture: ['', Validators.required]
    });
  }
  private resetMsgs() {
    if (this.errMsg) this.errMsg = '';
    if (this.succMsg) this.succMsg = '';

  }
  public openAddProdModal(content){
    this.modalService.open(content,{
      ariaLabelledBy:'modal-basic-title',
      backdrop:'static'
    });
  }
  public closeAddProdModal(content){
    this.resetMsgs();
    this.addProductForm.reset();
    content.close();
  }
  private getAllProducts() {
    this.HttpClient.get<any>('http://localhost:3000/products/all').subscribe(data => {
      this.productsList = data;
    },
      (error) => {
        console.log(error);
        this.errMsg = error;
      });
  }

  public addProduct(modal) {
    this.HttpClient.post<any>('http://localhost:3000/products/add', this.addProductForm.value).subscribe(data => {
      this.productsList = data;
      this.closeAddProdModal(modal);
    },
      (error) => {
        console.log(error);
        this.errMsg = error;
        this.closeAddProdModal(modal);
      });
  }



}
