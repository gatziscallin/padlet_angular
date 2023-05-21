import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Padlet, User} from '../shared/padlet';
import {Entrie} from "../shared/entrie";
import {PadletService} from "../shared/padlet.service";
import {EntrieService} from "../shared/entrie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {PadletFactory} from "../shared/padlet-factory";
import {UserFactory} from "../shared/user-factory";
import {EntrieFactory} from "../shared/entrie-factory";
import {Rating} from "../shared/rating";
import {Comment} from "../shared/comment";
import {AuthenticationService} from "../shared/authentication.service";

@Component({
  selector: 'bs-padlet-details',
  templateUrl: './padlet-details.component.html',
  styles: [
  ]
})

export class PadletDetailsComponent implements OnInit {

  padlet: Padlet = PadletFactory.empty();
  entries: Entrie[] = [];
  entrie: Entrie = EntrieFactory.empty();

  user: User = UserFactory.empty();

  constructor(
    private ps: PadletService,
    private es: EntrieService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.ps.getSinglePadlet(params['id'])
      .subscribe((p: Padlet) => {
        this.padlet = p;
        this.entries = this.padlet.entries;
        this.user = this.padlet.user;
        this.getRatings();
        this.getComments();
      });
  }

  getRatings() : void {
    for(let entrie of this.entries) {
      this.ps.getRatingsForEntrie(Number(entrie.id)).subscribe((res: Rating[]) => {
        entrie.ratings = res;
      })
    }
  }

  getComments() : void {
    for (let entrie of this.entries) {
      this.ps.getCommentsForEntrie(Number(entrie.id)).subscribe((res: Comment[]) => {
        entrie.comments = res;
      });
    }
  }

  getRating(rating: number) {
    return Array(rating)
  }

  deletePadlet(){
    if (confirm('Padlet wirklich löschen?')) {
      const params = this.route.snapshot.params;
      this.ps.deletePadlet(params['id']).subscribe(
        (e: any) => {
          this.router.navigate(['../../'],
            {relativeTo: this.route});
        }
      )
    }
  }

  deleteEntrie(id:string){
    if (confirm('Eintrag wirklich löschen?')) {
      this.es.deleteEntrie(Number(id)).subscribe(
        (e: any) => {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }
      )
    }
  }
}
