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
}

interface Usuario {
  id: number;
  nome: string;
}

interface RelatorioItem {
  id: number;
  projetoId: number;
  atividadeId: number;
  usuarioId: number;
  horas: number;
  data: Date;
}

@Component({
  selector: 'app-relatorios',
  standalone: true,
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  imports: [CommonModule, FormsModule]
})
export class RelatoriosComponent implements OnInit {
  projetos: Projeto[] = [];
  atividades: Atividade[] = [];
  usuarios: Usuario[] = [];
  relatorio: RelatorioItem[] = [];
  filtros: any = {
    projetoId: '',
    atividadeId: '',
    usuarioId: '',
    dataInicio: '',
    dataFim: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.carregarProjetos();
    this.carregarAtividades();
    this.carregarUsuarios();
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

  carregarUsuarios() {
    this.http.get<Usuario[]>('/api/usuarios').subscribe(data => {
      this.usuarios = data;
    });
  }

  gerarRelatorio() {
    this.http.post<RelatorioItem[]>('/api/relatorios', this.filtros).subscribe(data => {
      this.relatorio = data;
    });
  }

  getProjetoNome(projetoId: number): string {
    const projeto = this.projetos.find(p => p.id === projetoId);
    return projeto ? projeto.nome : 'N/A';
  }

  getAtividadeNome(atividadeId: number): string {
    const atividade = this.atividades.find(a => a.id === atividadeId);
    return atividade ? atividade.nome : 'N/A';
  }

  getUsuarioNome(usuarioId: number): string {
    const usuario = this.usuarios.find(u => u.id === usuarioId);
    return usuario ? usuario.nome : 'N/A';
  }
}
