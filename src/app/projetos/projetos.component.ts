import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Projeto {
  id: number;
  nome: string;
  descricao: string;
}

@Component({
  selector: 'app-projetos',
  standalone: true,
  templateUrl: './projetos.component.html',
  styleUrls: ['./projetos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class ProjetosComponent implements OnInit {
  projetos: Projeto[] = [];
  editandoProjeto: Projeto | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProjetos();
  }

  carregarProjetos() {
    this.http.get<Projeto[]>('/api/projetos').subscribe(data => {
      this.projetos = data;
    });
  }

  novoProjeto() {
    this.editandoProjeto = { id: 0, nome: '', descricao: '' };
  }

  editarProjeto(projeto: Projeto) {
    this.editandoProjeto = { ...projeto };
  }

  salvarProjeto() {
    if (this.editandoProjeto) {
      if (this.editandoProjeto.id) {
        // Editar projeto existente
        this.http.put(`/api/projetos/${this.editandoProjeto.id}`, this.editandoProjeto)
          .subscribe(() => this.carregarProjetos());
      } else {
        // Criar novo projeto
        this.http.post('/api/projetos', this.editandoProjeto)
          .subscribe(() => this.carregarProjetos());
      }
      this.editandoProjeto = null;
    }
  }

  excluirProjeto(id: number) {
    this.http.delete(`/api/projetos/${id}`).subscribe(() => this.carregarProjetos());
  }

  cancelarEdicao() {
    this.editandoProjeto = null;
  }
}
