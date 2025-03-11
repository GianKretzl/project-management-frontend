import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Chart, registerables } from 'chart.js';
import { CommonModule } from '@angular/common';

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
}

interface Atividade {
  id: number;
  nome: string;
  projetoId: number;
  horas: number;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [HttpClientModule, CommonModule]
})
export class DashboardComponent implements OnInit {
  projetos: Projeto[] = [];
  atividades: Atividade[] = [];
  horasTrabalhadas: number = 0;

  constructor(private http: HttpClient) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.carregarProjetos();
    this.carregarAtividades();
  }

  carregarProjetos() {
    this.http.get<Projeto[]>('/api/projetos').subscribe(data => {
      this.projetos = data;
      this.atualizarGrafico();
    });
  }

  carregarAtividades() {
    this.http.get<Atividade[]>('/api/atividades').subscribe(data => {
      this.atividades = data;
      this.calcularHorasTrabalhadas();
    });
  }

  calcularHorasTrabalhadas() {
    this.horasTrabalhadas = this.atividades.reduce((total, atividade) => total + atividade.horas, 0);
  }

  getProjetoNome(projetoId: number): string {
    const projeto = this.projetos.find(p => p.id === projetoId);
    return projeto ? projeto.nome : 'N/A';
  }

  atualizarGrafico() {
    const ctx = document.getElementById('horasTrabalhadasChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.projetos.map(p => p.nome),
        datasets: [{
          label: 'Horas Trabalhadas',
          data: this.projetos.map(p => this.atividades
            .filter(a => a.projetoId === p.id)
            .reduce((total, a) => total + a.horas, 0)),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
