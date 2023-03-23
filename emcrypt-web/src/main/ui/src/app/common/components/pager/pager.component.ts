import {
  Component,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  EventEmitter,
} from "@angular/core";
import {
  faAngleLeft,
  faAnglesLeft,
  faAngleRight,
  faAnglesRight,
} from "@fortawesome/free-solid-svg-icons";
import { Pager } from "../../models/model";

@Component({
  selector: "app-pager",
  templateUrl: "./pager.component.html",
  styleUrls: ["./pager.component.scss"],
})
export class PagerComponent implements OnChanges {
  @Input() total: number;
  @Output() pageChanged = new EventEmitter<Pager>();

  faAngleLeft = faAngleLeft;
  faAnglesLeft = faAnglesLeft;
  faAngleRight = faAngleRight;
  faAnglesRight = faAnglesRight;

  current = 0;
  size = 10;
  sizeList = [5, 10, 20, 50, 100];
  maxVisible = 5;
  leftFlow = false;
  rightFlow = false;
  visible: number[] = [];
  showScale = false;
  start = 0;
  end = 0;
  totalPages = 0;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  first() {
    if (this.current != 0) {
      this.current = 0;
      this.update();
    }
  }

  prev() {
    if (this.current > 0) {
      this.visible = [];
      this.current--;
      this.update();
    }
  }

  next() {
    if (this.current < this.totalPages - 1) {
      this.visible = [];
      this.current++;
      this.update();
    }
  }

  last() {
    if (this.current < this.totalPages - 1) {
      this.current = this.totalPages - 1;
      this.update();
    }
  }

  setPage(page: number) {
    if (page != -1) {
      this.current = page - 1;
      this.update();
    }
  }

  update() {
    this.visible = [];
    this.totalPages = Math.ceil(this.total / this.size);
    if (this.totalPages > 1) {
      this.showScale = true;

      this.start = this.current * this.size + 1;
      this.end = Math.min(this.start + this.size, this.total);

      if (this.totalPages <= 5) {
        for (let k = 1; k < this.totalPages; k++) {
          this.visible.push(k);
        }
      } else {
        if (this.current < 3) {
          this.visible = [1, 2, 3, 4, -1];
        } else if (this.current + 4 > this.totalPages) {
          this.visible = [-1];
          for (let k = this.totalPages - 3; k <= this.totalPages; k++) {
            this.visible.push(k);
          }
        } else {
          this.visible = [-1];
          for (let k = this.current; k < this.current + 3; k++) {
            this.visible.push(k);
          }
          this.visible.push(-1);
        }
      }
    } else {
      this.start = 1;
      this.end = this.total;
    }

    this.pageChanged.emit(new Pager(this.current, this.size));
  }
}
