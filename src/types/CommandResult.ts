export const status = {
    SUCCESS: 'SUCCESS' as const,
    ERROR: 'ERROR' as const
}

type CommandResult = {
    status: 'SUCCESS' | 'ERROR',
    commandOutput?: string
}

export default CommandResult;
