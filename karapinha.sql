-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 30/01/2025 às 22:02
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `karapinha`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `appointments`
--

CREATE TABLE `appointments` (
  `id` int(11) NOT NULL,
  `client_id` int(11) NOT NULL,
  `hairdresser_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('pending','confirmed','cancelled','completed') NOT NULL DEFAULT 'pending',
  `total_price` decimal(10,2) NOT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `appointments`
--

INSERT INTO `appointments` (`id`, `client_id`, `hairdresser_id`, `service_id`, `appointment_date`, `appointment_time`, `status`, `total_price`, `notes`, `created_at`) VALUES
(1, 5, 3, 3, '2025-01-30', '03:09:52', 'cancelled', 15000.00, NULL, '2025-01-30 02:09:55'),
(2, 5, 3, 6, '2025-01-30', '03:42:45', 'confirmed', 3000.00, NULL, '2025-01-30 02:42:49'),
(3, 5, 3, 3, '2025-01-31', '15:26:09', 'confirmed', 15000.00, NULL, '2025-01-30 14:26:20'),
(4, 5, 3, 3, '2025-01-31', '12:05:00', 'confirmed', 15000.00, NULL, '2025-01-30 16:02:47'),
(5, 5, 3, 7, '2025-01-31', '17:05:50', 'cancelled', 5000.00, NULL, '2025-01-30 16:06:01');

-- --------------------------------------------------------

--
-- Estrutura para tabela `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `appointment_id` int(11) NOT NULL,
  `rating` int(11) NOT NULL CHECK (`rating` >= 1 and `rating` <= 5),
  `comment` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `services`
--

CREATE TABLE `services` (
  `id` int(11) NOT NULL,
  `hairdresser_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `duration` int(11) NOT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `category` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `services`
--

INSERT INTO `services` (`id`, `hairdresser_id`, `name`, `description`, `price`, `duration`, `active`, `created_at`, `category`) VALUES
(1, 2, 'Corte Feminino', 'Corte e finalização', 80.00, 60, 1, '2025-01-29 15:59:45', ''),
(2, 2, 'Tranças', 'Box braids completa', 150.00, 180, 1, '2025-01-29 15:59:45', ''),
(3, 3, 'Cote Femenino', 'gdgdgd', 15000.00, 70, 1, '2025-01-29 18:15:02', ''),
(4, 3, 'Corte', 'Frances', 20000.00, 60, 1, '2025-01-29 21:05:20', 'Cortes'),
(5, 3, 'Far', 'T', 30.00, 60, 1, '2025-01-29 21:06:00', 'Tranças'),
(6, 3, 'Brech', 'Brech rápido ', 3000.00, 20, 1, '2025-01-29 21:37:25', 'Penteados'),
(7, 3, 'o43etr', 'Tgg', 5000.00, 1, 1, '2025-01-30 16:04:53', '');

-- --------------------------------------------------------

--
-- Estrutura para tabela `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('client','hairdresser','admin') NOT NULL,
  `profile_image` varchar(255) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `phone`, `role`, `profile_image`, `active`, `created_at`, `updated_at`) VALUES
(2, 'João Cabeleireiro', 'cabeleireiro@teste.com', '$2a$10$HASH_DA_SENHA', '987654321', 'hairdresser', NULL, 1, '2025-01-29 15:59:45', '2025-01-29 15:59:45'),
(3, 'Deusineusio Santos', 'cabelo@teste.com', '$2a$10$whCRegjafk.vy6Rr/h1M9eiXaHUCNtm0lfbMECU/JSL.ihwbCFtTS', '912345625', 'hairdresser', NULL, 1, '2025-01-29 17:14:10', '2025-01-29 17:14:10'),
(5, 'Maria Silva', 'cliente@teste.com', '$2a$10$JTK8fCxUOS9VQbc.b1miZe3/mnUyjCKB0DINjUkiqQOKakoVk1Im2', '924556688', 'client', NULL, 1, '2025-01-29 21:55:11', '2025-01-29 21:55:11');

--
-- Índices para tabelas despejadas
--

--
-- Índices de tabela `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `client_id` (`client_id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Índices de tabela `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `appointment_id` (`appointment_id`);

--
-- Índices de tabela `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `hairdresser_id` (`hairdresser_id`);

--
-- Índices de tabela `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT para tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `appointments`
--
ALTER TABLE `appointments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de tabela `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de tabela `services`
--
ALTER TABLE `services`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de tabela `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`client_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`hairdresser_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `appointments_ibfk_3` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`);

--
-- Restrições para tabelas `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `appointments` (`id`);

--
-- Restrições para tabelas `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_ibfk_1` FOREIGN KEY (`hairdresser_id`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
