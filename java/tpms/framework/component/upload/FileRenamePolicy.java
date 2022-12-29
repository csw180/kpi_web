package tpms.framework.component.upload;

import java.io.File;

public interface FileRenamePolicy
{

    public abstract File rename(File file);
}
