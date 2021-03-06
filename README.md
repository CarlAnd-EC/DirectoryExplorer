# Directory Explorer

This project contains basic file system operations, such as inspection, and removal of a directory.

## Installation

### Version 1.1.1 Release:

#### `git clone https://github.com/CarlosAEC-KS/DirectoryExplorer`

## Directory Inspector

In the CLI, you can run:

#### `node inspectDir.js <path>`

### Version 1.1.1 Features:
1. The list of elements in a directory specified by a `<path>` will be shown.
2. If the `<path>` is not specified it will display the files in the current directory.
3. If the directory does not exist, an error message is shown.

## Directory Remover

In the CLI, you can run:

#### `node removeDir.js <path>`

### Version 1.1.1 Features:
1. A directory specified by a `<path>` will be removed.
2. If directory doesn’t exist, an error message is shown.
3. If the directory is not empty, ask the user for confirmation.
4. If the user confirms, remove all file and directories.
5. Display the number of subdirectories and files  removed.

#### Warning, do not delete important directories. This action cannot be undone.

#### Created by **_Carlos Andrés Escalona Contreras_**   April 19, 2021