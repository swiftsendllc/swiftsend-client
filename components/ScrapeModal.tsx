import useAPI from '@/hooks/api/useAPI';
import { LoadingButton } from '@mui/lab';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  isOpen: boolean;
  onClose?: () => unknown;
}
export const ScrapeDialog: React.FC<Props> = ({ isOpen, onClose }) => {
  const [open, setOpen] = useState(isOpen);
  useEffect(() => setOpen(isOpen), [isOpen]);
  const { scrape } = useAPI();
  const [url, setUrl] = useState<string>('');
  const [directory, setDirectory] = useState<string>('');
  const [hasSubFolders, setHasSubFolders] = useState<boolean>(false);

  const handleClose = () => {
    onClose?.();
    setUrl('');
    setDirectory('');
    setOpen(false);
  };

  const handleSubmit = async () => {
    try {
      console.log('url: ', url);
      console.log('dir: ', directory);
      await scrape({ domain: url, subDirectory: directory, hasSubFolders:hasSubFolders });
    } catch (error) {
      toast.error('Oops! Something wrong happened!', error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth={true}>
        <FormControl
          variant="standard"
          fullWidth
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            return handleSubmit();
          }}
        >
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>Enter the url to start scraping</DialogContentText>
            <Stack direction={'column'} spacing={1}>
              <TextField
                autoFocus
                required
                margin="dense"
                id="name"
                name="text"
                label="URL Address"
                type="text"
                fullWidth
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                variant="standard"
              />
              <Stack direction={'row'} spacing={1}>
                <FormLabel id="demo-controlled-radio-buttons-group">Folder?</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={hasSubFolders}
                  onChange={() => setHasSubFolders((prev) => !prev)}
                >
                  <FormControlLabel value={true} control={<Radio />} label="Yes" />
                  <FormControlLabel value={false} control={<Radio />} label="No" />
                </RadioGroup>

                <TextField
                  autoFocus
                  required
                  margin="dense"
                  id="directory"
                  name="Directory"
                  label="Enter the directory"
                  type="text"
                  fullWidth
                  value={directory}
                  onChange={(e) => setDirectory(e.target.value)}
                  variant="standard"
                />
              </Stack>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              loadingPosition="start"
              startIcon={null}
              variant="contained"
              type="submit"
              disabled={!(url && directory)}
            >
              SUBMIT
            </LoadingButton>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
};
