"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useListUsers } from "./hooks/useListUsers";
import { useDeleteUser } from "./hooks/useDeleteUser";
import Link from "next/link";
import { maskPhoneNumber } from "@/core/common/functions/masks/phoneNumber";

export const UsersPage = () => {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: usersResponse, isLoading, error } = useListUsers();
  const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditUser = (id: string) => {
    router.push(`/users/${id}/edit`);
  };

  const handleDeleteUser = (
    event: React.MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    event.stopPropagation();

    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      deleteUser(id);
    }
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error">
          Erro ao carregar usuários: {error.message}
        </Alert>
      </Box>
    );
  }

  const users = usersResponse?.records ?? [];
  const totalRecords = usersResponse?.total_records ?? 0;

  const paginatedUsers = users.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";

    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <Box>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        sx={{ width: "100%" }}
      >
        <Typography variant="h5">Usuários</Typography>

        <Link href="/users/create">
          <Button variant="contained" startIcon={<AddIcon />}>
            ADICIONAR USUÁRIO
          </Button>
        </Link>
      </Box>

      <Paper sx={{ width: "85vw", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="users table">
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Sobrenome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
                <TableCell>Data de Nasc.</TableCell>
                <TableCell>Ativo</TableCell>
                <TableCell>Criado Em</TableCell>
                <TableCell align="right">Ações</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow
                  hover
                  key={user.id}
                  onClick={() => handleEditUser(user.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <TableCell>{user.first_name}</TableCell>
                  <TableCell>{user.last_name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {`${user.country_code ?? ""} ${
                      maskPhoneNumber(user.phone_number ?? "") ?? ""
                    }`.trim() ?? "-"}
                  </TableCell>
                  <TableCell>{formatDate(user.date_of_birth)}</TableCell>
                  <TableCell>{user.is_active ? "Sim" : "Não"}</TableCell>
                  <TableCell>{formatDate(user.created_at)}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditUser(user.id);
                      }}
                      sx={{ mr: 1 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={(e) => handleDeleteUser(e, user.id)}
                      disabled={isDeleting}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
              {paginatedUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center">
                    Nenhum usuário encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={totalRecords}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage="Linhas por página:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}-${to} de ${count}`
          }
        />
      </Paper>
    </Box>
  );
};
