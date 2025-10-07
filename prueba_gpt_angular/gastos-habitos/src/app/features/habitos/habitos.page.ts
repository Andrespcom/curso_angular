import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'habitos.page',
  template: `
    <section class="container">
      <h1 class="title">Hábitos</h1>
      <p class="muted">Checklist diaria y racha (pendiente de implementar).</p>
    </section>
  `,
  styles: [
    `
      .container {
        padding: 1rem;
      }
      .title {
        font-size: 1.25rem;
        margin: 0.5rem 0 1rem;
      }
      .muted {
        color: #666;
      }
    `,
  ],
})
export class HabitosPageComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
