import { useState, useEffect } from 'react';
import axios from 'axios';
import * as styles from './Clientes.module.css';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { useTheme } from "../../context/ThemeContext";

import { useAuth } from "../../context/AuthContext";

document.documentElement.classList.add('dark');

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [filtro, setFiltro] = useState('todos');
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');
    const [clienteSelecionado, setClienteSelecionado] = useState(null);
    const [modalTipo, setModalTipo] = useState(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const token = localStorage.getItem('token');

    const fetchClientes = () => {
        if (!token) {
            setErro('Token de autenticação não encontrado.');
            setLoading(false);
            return;
        }

        axios
            .get('http://localhost:8080/clientes', {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((res) => {
                setClientes(res.data);
                setErro('');
            })
            .catch(() => {
                setErro('Não foi possível carregar os clientes.');
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchClientes();
    }, []);

    const abrirModalUpdate = (cliente) => {
        setClienteSelecionado(cliente);
        reset({
            telefone: cliente.telefone,
            email: cliente.email,
            senha: '',
        });
        setModalTipo('update');
    };

    const abrirModalDelete = (cliente) => {
        setClienteSelecionado(cliente);
        setModalTipo('delete');
    };

    const fecharModal = () => {
        setClienteSelecionado(null);
        setModalTipo(null);
    };

    const onSubmitUpdate = async (dados) => {
        try {
            await axios.put(`http://localhost:8080/clientes/${clienteSelecionado.id}`, {
                telefone: dados.telefone,
                email: dados.email,
                senha: dados.senha,
                clientePerfis: clienteSelecionado.clientePerfis
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });

            alert('Cliente atualizado com sucesso!');
            fecharModal();
            fetchClientes();
        } catch (error) {
            alert('Erro ao atualizar cliente.');
        }
    };

    const confirmarDelete = async () => {
        try {
            await axios.delete(`http://localhost:8080/clientes/${clienteSelecionado.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Cliente desativado com sucesso!');
            fecharModal();
            fetchClientes();
        } catch (error) {
            alert('Erro ao desativar cliente.');
        }
    };

    const filtrarClientes = () => {
        if (filtro === 'admin') {
            return clientes.filter((c) =>
                c.clientePerfis?.some((p) => p.perfil.nome === 'ROLE_ADMIN')
            );
        } else if (filtro === 'client') {
            return clientes.filter((c) =>
                c.clientePerfis?.some((p) => p.perfil.nome === 'ROLE_CLIENT')
            );
        }
        return clientes;
    };

    return (
        <main className={`${styles.container} ${styles.themeLocal}`}>
            <h2 className={styles.categoryTitle}>Lista de Clientes</h2>

            <div className={styles.filtroContainer}>
                {['todos', 'admin', 'client'].map((tipo) => (
                    <button
                        key={tipo}
                        onClick={() => setFiltro(tipo)}
                        className={filtro === tipo ? styles.active : ''}
                    >
                        {tipo === 'todos' ? 'Todos' : tipo === 'admin' ? 'Administradores' : 'Clientes'}
                    </button>
                ))}
            </div>

            {loading ? (
                <p>Carregando clientes...</p>
            ) : erro ? (
                <p className={styles.error}>{erro}</p>
            ) : (
                <div className={styles.contentProducts}>
                    {filtrarClientes().map((cliente) => (
                        <div key={cliente.id} className={styles.product}>
                            <h3>{cliente.nome}</h3>
                            <div className={styles.productInfo}>
                                <p><strong>Email:</strong> {cliente.email}</p>
                                <p><strong>Telefone:</strong> {cliente.telefone}</p>
                                <p><strong>CPF:</strong> {cliente.cpf}</p>
                                <p><strong>Status:</strong> {cliente.status ? 'Ativo' : 'Inativo'}</p>
                                <p><strong>Cadastro:</strong> {format(new Date(cliente.cadastro), 'dd/MM/yyyy')}</p>
                                <p><strong>Perfis:</strong> {cliente.clientePerfis?.map((p) => p.perfil?.nome?.replace('ROLE_', '')).join(', ')}</p>

                                {cliente.endereco && (
                                    <p><strong>Endereço:</strong> {cliente.endereco.logradouro}, {cliente.endereco.bairro} - {cliente.endereco.localidade}</p>
                                )}

                                <div className={styles.actions}>
                                    <button onClick={() => abrirModalUpdate(cliente)}>Editar</button>
                                    <button onClick={() => abrirModalDelete(cliente)} className={styles.delete}>Desativar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal de Edição */}
            {modalTipo === 'update' && clienteSelecionado && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Atualizar Cliente</h3>
                        <form onSubmit={handleSubmit(onSubmitUpdate)} className={styles.formUpdate}>
                            <label>
                                Telefone:
                                <input {...register('telefone', { required: true })} />
                            </label>
                            <label>
                                Email:
                                <input {...register('email', { required: true })} />
                            </label>
                            <label>
                                Nova Senha:
                                <input type="password" {...register('senha', { required: true })} />
                            </label>
                            <div className={styles.modalButtons}>
                                <button type="submit">Salvar</button>
                                <button type="button" onClick={fecharModal}>Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Modal de Confirmação de Exclusão */}
            {modalTipo === 'delete' && clienteSelecionado && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h3>Desativar Cliente</h3>
                        <p>Tem certeza que deseja desativar {clienteSelecionado.nome}?</p>
                        <div className={styles.modalButtons}>
                            <button onClick={confirmarDelete}>Sim</button>
                            <button onClick={fecharModal}>Não</button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
};

export default Clientes;