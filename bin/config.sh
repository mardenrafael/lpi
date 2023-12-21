#!/bin/sh

LPI_PATH=""
PROJECT_ROOT=""

if [ ! -z $1 ]; then
	while getopts ":d:" opt; do
		case $opt in
			d)
				PROJECT_ROOT=$OPTARG
				break
				;;
			*)
				echo "Você precisa indicar a pasta raiz do projeto com \"-d /path/to/project/root\"." >&2
				return 1
				;;
		esac
	done
else
	echo "Você precisa indicar a pasta raiz do projeto com \"-d /path/to/project/root\"." >&2
	return 1
fi

PROJECT_ROOT=$PROJECT_ROOT

if [ ! -d "${PROJECT_ROOT}/bin" ]; then
    echo "O diretório ${PROJECT_ROOT}/bin não existe." >&2
	return 1
fi

LPI_PATH="${PROJECT_ROOT}/bin/lpi"

if ! command -v jq > /dev/null 2>&1; then
	echo "O \"jq\" não foi encontrado." >&2
	return 1
fi

if [ ! -f "$LPI_PATH" ]; then
	echo "Não foi possível encontrar o script \"lpi\"." >&2
	return 1
else
	chmod +x "$LPI_PATH"
fi

export PATH="${PROJECT_ROOT}/bin":$PATH
export PROJECT_ROOT=$PROJECT_ROOT

if command -v lpi > /dev/null 2>&1; then
	echo "Lpi configurado com sucesso"
	return 0
else
	echo "Erro ao configurar lpi" >&2
	return 1
fi