import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Atividade {
  id: number;
  nome: string;
}

interface Lancamento {
  id: number;
  atividadeId: number;
  horas: number;
  data: Date;
}

@Component({
  selector: 'app-lancamentos',
  standalone: true,
  templateUrl: './lancamentos.component.html',
  styleUrls: ['./lancamentos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class LancamentosComponent implements OnInit {
  atividades: Atividade[] = [];
  lancamentos: Lancamento[] = [];
  novoLancamento: Partial<Lancamento> = { atividadeId: 0, horas: 0, data: new Date() };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarAtividades();
    this.carregarLancamentos();
  }

  carregarAtividades() {
    this.http.get<Atividade[]>('/api/atividades').subscribe(data => {
      this.atividades = data;
    });
  }

  carregarLancamentos() {
    this.http.get<Lancamento[]>('/api/lancamentos').subscribe(data => {
      this.lancamentos = data;
    });
  }

  lancarHoras() {
    if (this.novoLancamento.atividadeId && this.novoLancamento.horas) {
      this.novoLancamento.data = new Date();
      this.http.post('/api/lancamentos', this.novoLancamento)
        .subscribe(() => {
          this.carregarLancamentos();
          this.novoLancamento = { atividadeId: 0, horas: 0, data: new Date() };
        });
    }
  }

  getAtividadeNome(atividadeId: number): string {
    const atividade = this.atividades.find(a => a.id === atividadeId);
    return atividade ? atividade.nome : 'N/A';
  }
}
