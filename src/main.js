import { fromEvent, interval, combineLatest } from 'rxjs';
import {
  debounce,
  filter,
  pluck,
  distinctUntilChanged,
  map,
} from 'rxjs/operators';

const favoriteColor = document.getElementById('favorite-color');
const favoriteAnimal = document.getElementById('favorite-animal');
const bandName = document.getElementById('band-name');

const favorites$ = [favoriteColor, favoriteAnimal].map((el) =>
  fromEvent(el, 'keydown').pipe(
    debounce(() => interval(500)),
    filter((e) => e.key !== ' '),
    pluck('target', 'value'),
    map((val) => val.toUpperCase()),
    distinctUntilChanged()
  )
);

const combined$ = combineLatest(favorites$[0], favorites$[1]);

combined$.subscribe((val) => {
  console.log(val);
  bandName.textContent = '🎵 ' + val.join(' ') + ' 🎵';
  bandName.style.textShadow = `1px 1px 2px black, 0 0 1em ${val[0]}, 0 0 0.2em ${val[0]}`;
});
