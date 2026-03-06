-- Création de la base de données
CREATE DATABASE IF NOT EXISTS school_epg;
USE school_epg;

-- Table des Utilisateurs (Admin, Comptable, Agent)
CREATE TABLE IF NOT EXISTS Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin', 'accountant', 'agent') DEFAULT 'agent',
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des Filières (Programs)
CREATE TABLE IF NOT EXISTS Programs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    code VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des Groupes (Classes)
CREATE TABLE IF NOT EXISTS Groups (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    ProgramId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProgramId) REFERENCES Programs(id) ON DELETE SET NULL
);

-- Table des Étudiants
CREATE TABLE IF NOT EXISTS Students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    cne VARCHAR(255) NOT NULL UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255),
    status ENUM('active', 'suspended') DEFAULT 'active',
    ProgramId INT,
    GroupId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProgramId) REFERENCES Programs(id) ON DELETE SET NULL,
    FOREIGN KEY (GroupId) REFERENCES Groups(id) ON DELETE SET NULL
);

-- Table des Frais/Tarifs (Fees)
CREATE TABLE IF NOT EXISTS Fees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    dueDate DATE NOT NULL,
    description VARCHAR(255),
    period VARCHAR(255),
    ProgramId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (ProgramId) REFERENCES Programs(id) ON DELETE SET NULL
);

-- Table des Paiements
CREATE TABLE IF NOT EXISTS Payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    amount DECIMAL(10, 2) NOT NULL,
    date DATE DEFAULT (CURRENT_DATE),
    method ENUM('cash', 'transfer', 'check') NOT NULL,
    reference VARCHAR(255),
    status ENUM('completed', 'partial') DEFAULT 'completed',
    period VARCHAR(255),
    StudentId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (StudentId) REFERENCES Students(id) ON DELETE CASCADE
);

-- Table des Reçus
CREATE TABLE IF NOT EXISTS Receipts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    number VARCHAR(255) NOT NULL UNIQUE,
    url VARCHAR(255),
    PaymentId INT,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PaymentId) REFERENCES Payments(id) ON DELETE SET NULL
);

-- DONNÉES DE TEST (Jeu de données)

-- 1. Utilisateurs
-- Mot de passe pour tous les utilisateurs : "123456"
INSERT INTO Users (name, email, password, role) VALUES
('Administrateur', 'admin@school.com', '$2b$10$0gDds0Fq02E94wbXMTdFx./BR8Rbgp2LF9CfwmUMP/YWbRI3K0nr.', 'admin'),
('Comptable', 'compta@school.com', '$2b$10$0gDds0Fq02E94wbXMTdFx./BR8Rbgp2LF9CfwmUMP/YWbRI3K0nr.', 'accountant'),
('Agent Saisie', 'agent@school.com', '$2b$10$0gDds0Fq02E94wbXMTdFx./BR8Rbgp2LF9CfwmUMP/YWbRI3K0nr.', 'agent');

-- 2. Filières
INSERT INTO Programs (name, code, description) VALUES
('Développement Digital', 'DEV', 'Formation en développement web et mobile'),
('Infrastructure Digitale', 'INFRA', 'Réseaux, systèmes et sécurité'),
('Marketing Digital', 'MARKETING', 'Stratégie digitale et communication');

-- 3. Groupes
INSERT INTO Groups (name, ProgramId) VALUES
('DEV-101', 1),
('DEV-102', 1),
('INFRA-101', 2),
('MKT-101', 3);

-- 4. Étudiants (15 étudiants)
INSERT INTO Students (cne, firstName, lastName, email, phone, status, ProgramId, GroupId) VALUES
('D130001', 'Yassir', 'El Alami', 'yassir@student.com', '0600000001', 'active', 1, 1),
('D130002', 'Sara', 'Benani', 'sara@student.com', '0600000002', 'active', 1, 1),
('D130003', 'Karim', 'Tazi', 'karim@student.com', '0600000003', 'active', 1, 2),
('D130004', 'Lina', 'Mansouri', 'lina@student.com', '0600000004', 'active', 2, 3),
('D130005', 'Omar', 'Berrada', 'omar@student.com', '0600000005', 'suspended', 1, 1),
('D130006', 'Hajar', 'Fassi', 'hajar@student.com', '0600000006', 'active', 3, 4),
('D130007', 'Mehdi', 'Chraibi', 'mehdi@student.com', '0600000007', 'active', 2, 3),
('D130008', 'Noura', 'Amrani', 'noura@student.com', '0600000008', 'active', 1, 2),
('D130009', 'Youssef', 'Idrissi', 'youssef@student.com', '0600000009', 'active', 3, 4),
('D130010', 'Salma', 'Kabbaj', 'salma@student.com', '0600000010', 'active', 1, 1),
('D130011', 'Anas', 'Bennani', 'anas@student.com', '0600000011', 'active', 2, 3),
('D130012', 'Rania', 'Alami', 'rania@student.com', '0600000012', 'active', 1, 2),
('D130013', 'Khalid', 'Ouazzani', 'khalid@student.com', '0600000013', 'suspended', 3, 4),
('D130014', 'Imane', 'Zahidi', 'imane@student.com', '0600000014', 'active', 2, 3),
('D130015', 'Ahmed', 'Sefrioui', 'ahmed@student.com', '0600000015', 'active', 1, 1);

-- 5. Frais (Exemples)
INSERT INTO Fees (amount, dueDate, description, period, ProgramId) VALUES
(2500.00, '2023-10-05', 'Frais scolarité Octobre', '2023-10', 1),
(2500.00, '2023-11-05', 'Frais scolarité Novembre', '2023-11', 1),
(2200.00, '2023-10-05', 'Frais scolarité Octobre', '2023-10', 3);

