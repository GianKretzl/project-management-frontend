import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Projeto {
  id: number;
  nome: string;
}

interface Atividade {
  id: number;
  nome: string;
  projetoId: number;
  horas: number;
}

@Component({
  selector: 'app-atividades',
  standalone: true,
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css'],
  imports: [CommonModule, FormsModule]
})
export class AtividadesComponent implements OnInit {
  projetos: Projeto[] = [];
  atividades: Atividade[] = [];
  editandoAtividade: Atividade | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProjetos();
    this.carregarAtividades();
  }

  carregarProjetos() {
    this.http.get<Projeto[]>('/api/projetos').subscribe(data => {
      this.projetos = data;
    });
  }

  carregarAtividades() {
    this.http.get<Atividade[]>('/api/atividades').subscribe(data => {
      this.atividades = data;
    });
  }

  novaAtividade() {
    this.editandoAtividade = { id: 0, nome: '', projetoId: 0, horas: 0 };
  }

  editarAtividade(atividade: Atividade) {
    this.editandoAtividade = { ...atividade };
  }

  salvarAtividade() {
    if (this.editandoAtividade) {
      if (this.editandoAtividade.id) {
        // Editar atividade existente
        this.http.put(`/api/atividades/${this.editandoAtividade.id}`, this.editandoAtividade)
          .subscribe(() => this.carregarAtividades());
      } else {
        // Criar nova atividade
        this.http.post('/api/atividades', this.editandoAtividade)
          .subscribe(() => this.carregarAtividades());
      }
      this.editandoAtividade = null;
    }
  }

  excluirAtividade(id: number) {
    this.http.delete(`/api/atividades/${id}`).subscribe(() => this.carregarAtividades());
  }

  cancelarEdicao() {
    this.editandoAtividade = null;
  }

  getProjetoNome(projetoId: number): string {
    const projeto = this.projetos.find(p => p.id === projetoId);
    return projeto ? projeto.nome : 'N/A';
  }
}
