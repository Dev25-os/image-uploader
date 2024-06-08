import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type PropType = {
  openDialog: boolean;
  setOpenDialog: (value: boolean) => void;
};

const UploadImage = ({ openDialog, setOpenDialog }: PropType) => {
  return (
    <div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Upload image(s)</DialogTitle>
            <DialogDescription>You may upload up to 5 images</DialogDescription>
          </DialogHeader>

          <div>
            
          </div>



        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UploadImage;
