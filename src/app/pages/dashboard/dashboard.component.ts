import { ManageShopService } from './dashboard.service';
import { DefaultModal } from './../ui/components/modals/default-modal/default-modal.component';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component } from '@angular/core';
// import { DefaultModal } from './default-modal/default-modal.component';

@Component({
  selector: 'dashboard',
  styleUrls: ['./dashboard.scss'],
  templateUrl: './dashboard.html'
})
export class Dashboard {
  private shopsL: any = {};
  private selectedShop: Array<any> = [];
  private shops: Array<any> = [];
  private shopList: Array<any> = [];
  private currentPageSelected: number = 1;
  private typeTab = 'รายการร้านค้า';
  private curentPage: Array<any> = [];


  constructor(private modalService: NgbModal, private activeModal: NgbActiveModal, public manageShopService: ManageShopService) {
  }

  ngOnInit() {
    this.getListShop();
  }

  importForm() {
    const activeModal = this.modalService.open(DefaultModal, { size: 'lg' });
    activeModal.componentInstance.modalHeader = 'นำเข้าร้านค้าจาก Facebook';
  }
  closeModal() {
    this.activeModal.close();
  }
  getListShop() {
    this.manageShopService.getLocalJSONshoplist().subscribe(resp => {
      this.shopsL = resp;
      console.log(this.shopsL);
      this.curentPage[1] = 'active';
    });
  }

  selectShops(id) {
    if (this.selectedShop[id]) {
      this.selectedShop[id] = false;
      this.processSelectShop(id);
    } else {
      this.selectedShop[id] = true;
      this.processSelectShop(id);
    }
  }

  selectTab(name) {
    this.currentPageSelected = 1;
    this.typeTab = name;
    // this.searchShop();
  }

  // searchShop() {
  //   this.manageShopService.searchShop(this.typeTab, this.currentPageSelected, this.searchKeyword).subscribe(data => {
  //     this.shopsL.items = data.items;
  //     this.shopsL.pagings = data.pagings;
  //   }, err => {
  //     console.log(err);
  //   });
  // }

  processSelectShop(id) {
    let checkDup: number = this.shops.findIndex(i => i.id === id);
    this.shopList.forEach(element => {
      if (element.id == id) {
        if (checkDup == -1) {
          this.shops.push(element);
        } else {
          this.shops.splice(checkDup, 1);
        }
      }
    });
  }
}
