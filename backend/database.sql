-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Jeu 26 Octobre 2017 à 13:53
-- Version du serveur :  5.7.19-0ubuntu0.16.04.1
-- Version de PHP :  7.0.22-0ubuntu0.16.04.1

SET SQL_MODE "NO_AUTO_VALUE_ON_ZERO";
SET time_zone="+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `gamenight`
--

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users`(
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `firstname` varchar(255) NOT NULL,
  `lastname` VARCHAR(255) NOT NULL,
  `username` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE, 
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('ADMIN', 'USER')
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Structure de la table `games`
--

CREATE TABLE `games` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(255) NOT NULL,
  `playerNumber` VARCHAR(32) NOT NULL,
  `gameplayStyle` VARCHAR(255),
  `editor` VARCHAR(255), 
  `ages` VARCHAR(255),
  `duration` VARCHAR(255)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `item`
--

INSERT INTO `games` (`id`, `name`, `playerNumber`, `gameplayStyle`, `editor`, `ages`, `duration`) VALUES
(1, 'Monopoly', '2 to 6', 'Auction', 'hasbro', 'from 8 years old', '30min to 1h'),
(2, 'Risk', '2 to 6', 'wargame', 'hasbro', 'from 10 years old', '1 to 2h');

--
-- Structure de la table `photos`
--

CREATE TABLE `photos` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `description` varchar(255) NOT NULL,
  `games_id` INT UNSIGNED NOT NULL,
  INDEX `fk_users_has_games_games_idx`
(`games_id` ASC) VISIBLE,
CONSTRAINT `fk_users_has_games_games`
    FOREIGN KEY(`games_id`)
    REFERENCES `games`(`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
) ENGINE=InnoDB
DEFAULT CHARSET=latin1;



CREATE TABLE `users_has_games`(
  `users_id` INT UNSIGNED NOT NULL,
  `games_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`users_id`, `games_id`),
  INDEX `fk_users_has_games_games1_idx` (`games_id` ASC) VISIBLE,
  INDEX `fk_users_has_games_users_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_has_games_users`
    FOREIGN KEY (`users_id`)
    REFERENCES `users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_users_has_games_games1`
    FOREIGN KEY (`games_id`)
    REFERENCES `games` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
