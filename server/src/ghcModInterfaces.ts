/* --------------------------------------------------------------------------------------------
 * Copyright (c) Cody Hoover. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
import { Diagnostic, Position, Location,
         DocumentSymbolParams, SymbolInformation } from 'vscode-languageserver';

export enum LogLevel {
    none,
    error,
    warn,
    info,
    log
}

export enum CheckTrigger {
    onSave,
    onChange,
    off
}

export interface ILogger {
    setLogger(any): void;
    setLogLevel(level: LogLevel): void;
    error(message: string): void;
    warn(message: string): void;
    log(message: string): void;
    info(message: string): void;
}

export interface GhcModCmdOpts {
    command: string;
    text?: string;
    uri?: string;
    args?: string[];
}

export interface IGhcMod {
    runGhcModCommand(options: GhcModCmdOpts): Promise<string[]>;
    killProcess(): void;
}

export interface IGhcModProvider {
    doCheck(text: string, uri: string, mapFile: boolean): Promise<Diagnostic[]>;
    getType(text: string, uri: string, position: Position, mapFile: boolean): Promise<string>;
    getInfo(text: string, uri: string, position: Position, mapFile:boolean): Promise<string>;
    getDefinitionLocation(text: string, uri: string, position: Position, root: string): Promise<Location[]>;
    shutdown(): void;
}

export interface ISymbolProvider {
    getSymbolsForFile(documentSymbolParams : DocumentSymbolParams) : SymbolInformation[] | Thenable<SymbolInformation[]>;
    getSymbolsForWorkspace(options, cancellationToken): SymbolInformation[] | Thenable<SymbolInformation[]>;
}