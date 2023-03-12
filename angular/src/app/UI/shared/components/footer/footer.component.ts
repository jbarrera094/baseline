import { Component, OnInit } from '@angular/core';
import { faInstagram, faTelegram, faFacebook, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faInstagram = faInstagram;
  faTelegram = faTelegram;
  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faYoutube = faYoutube;
  constructor() { }

  ngOnInit(): void {
  }

}
