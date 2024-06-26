import { DialogPortal } from "@radix-ui/react-dialog";
import React from "react";
import { useForm } from "react-hook-form";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogOverlay,
    DialogTitle,
    InputError,
    InputGroup,
    InputLabel,
    InputSimple,
    SaveButton,
} from "../../../base";
import { useUpdateSubtraction } from "../../queries";
import { Subtraction } from "../../types";

type EditSubtractionProps = {
    /** The subtraction data */
    subtraction: Subtraction;
    /** Indicates whether the modal for editing a subtraction is visible */
    show: boolean;
    /** A callback function to hide the modal */
    onHide: () => void;
};

/**
 * Dialog for editing an existing subtraction
 */
export default function EditSubtraction({ subtraction, show, onHide }: EditSubtractionProps) {
    const mutation = useUpdateSubtraction(subtraction.id);

    const {
        formState: { errors },
        register,
        handleSubmit,
    } = useForm({ defaultValues: { name: subtraction.name, nickname: subtraction.nickname } });

    function onSubmit({ name, nickname }) {
        mutation.mutate({ name, nickname });
        onHide();
    }

    return (
        <Dialog open={show} onOpenChange={onHide}>
            <DialogPortal>
                <DialogOverlay />
                <DialogContent>
                    <DialogTitle>Edit Subtraction</DialogTitle>
                    <form onSubmit={handleSubmit(values => onSubmit({ ...values }))}>
                        <InputGroup>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <InputSimple id="name" {...register("name", { required: "A name must be provided" })} />
                            <InputError>{errors.name?.message}</InputError>
                        </InputGroup>
                        <InputGroup>
                            <InputLabel htmlFor="nickname">Nickname</InputLabel>
                            <InputSimple id="nickname" {...register("nickname")} />
                        </InputGroup>

                        <DialogFooter>
                            <SaveButton />
                        </DialogFooter>
                    </form>
                </DialogContent>
            </DialogPortal>
        </Dialog>
    );
}
