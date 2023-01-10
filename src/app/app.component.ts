import { Component, OnInit, VERSION } from '@angular/core';
import { from, map, of, tap, take } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  name = 'Angular ' + VERSION.major;
  public arr1 = of(1, 2, 3);
  public arr2 = from(['1', '2', '3']);

  ngOnInit() {
    console.log(this.arr1);
    this.arr1
      .pipe(
        map((e) => e * 2),
        map((e) => e - 3),
        map((e) => {
          if (e < 0) {
            throw new Error('negative value detected');
          }
          return e;
        }),
        tap((e) => console.log(e)),
        take(2)
      )
      .subscribe((e) => console.log('e: ', e));
    this.arr2.subscribe({
      next: (item) => console.log(`resulting item .. ${item}`),
      error: (err) => console.log(`error occured .. ${err}`),
      complete: () => console.log('complete'),
    });
  }
}
