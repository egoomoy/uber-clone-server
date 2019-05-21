import {
  BaseEntity,
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert
} from "typeorm";
import { verificationTaget } from "src/types/types";

const PHONE = "PHONE";
const EMAIL = "EMAIL";

@Entity()
class Verification extends BaseEntity {
  @PrimaryColumn() id: number;

  @Column({ type: "text", enum: [PHONE, EMAIL] })
  target: verificationTaget;

  @Column({ type: "text" })
  payload: string;

  @Column({ type: "text" })
  key: string;

  @Column({ type: "boolean", default: false })
  used: boolean;

  @CreateDateColumn() createAt: string;
  @UpdateDateColumn() updateAt: string;

  @BeforeInsert()
  private createkey(): void {
    if (this.target === PHONE) {
      this.key = Math.floor(Math.random() * 100000).toString();
    } else if (this.target === EMAIL) {
      this.key = Math.floor(Math.random() * 100000)
        .toString(36)
        .substr(2);
    }
  }
}

export default Verification;
